#!/usr/bin/env python3
# -*- coding: UTF-8 -*-
"""
Add American English pronunciations and reformat the word list
Usage: addprons.py <input_word_file> <output_word_file>
"""
import sys
import os
import re

def main():
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    input_file = sys.argv[1]
    output_file = sys.argv[2]

    if not os.path.isfile(input_file):
        print("error: {} does not exist".format(input_file))
        sys.exit(1)

    if os.path.isfile(output_file):
        print("{} exists. Override (y/n)?".format(output_file))
        reply = input().strip().lower()
        if reply[0] != 'y':
            sys.exit(1)

    # Add American Pronounciations to the word list one by one
    with open(input_file, 'r') as in_fp, open(output_file, 'w') as out_fp:
        for line in in_fp:
            line = line.rstrip()
            if re.search(r"\| 单词", line):
                line = "| 单词 | 正确发音（英音）| 正确发音（美音）| 错误发音 |"
            elif re.search(r"\| ----", line):
                line = "| ---- | --------------- | ----------------- | ----------- | "
            elif re.search(r'✅', line):
                word = " "
                britsh = " "
                american = " "
                fields = re.split(r'\|', line)
                match = re.findall(r'[\w\-\s]+', fields[1])
                if match:
                    word = match[0]
                pron = re.findall(r'\[🔊\]\(http.*\)', fields[1])
                if pron:
                    britsh = pron[0]
                    american = britsh.replace("type=1", "type=2")
                britsh = britsh + fields[2]
                line = '|' + word + '| ' + britsh + '| ' + american + ' | ' +fields[3] + '|'
            out_fp.write(line + '\n')
            print(line)
    in_fp.close()
    out_fp.close()

if __name__ == '__main__':
    main()
