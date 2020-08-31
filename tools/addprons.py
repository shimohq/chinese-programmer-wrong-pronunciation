#!/usr/bin/env python3.8
# -*- coding: UTF-8 -*-
"""
Add American English pronunciations and reformat the word list
Usage: addprons.py <input_word_file> <output_word_file>
"""
import sys
import os
import re
import urllib.request
from bs4 import BeautifulSoup


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
                britsh_pron = " "
                american_pron = " "
                print(line)
                fields = re.split(r'\|', line)
                print(fields[1])
                match = re.findall(r'[\w\-\s]+', fields[1])
                if match:
                    word = match[0]
                britsh = re.findall(r'\[🔊\]\(http.*\)', fields[1])
                print(britsh)
                if britsh:
                    britsh_pron = britsh[0]
                    american_pron = britsh_pron.replace("type=1", "type=2")
                britsh_pron = britsh_pron + fields[2]
                american_pron = american_pron + "✅ " + get_phonetics(word, 2)
                line = '|' + word + '|' + britsh_pron + '|' + american_pron + ' | ' + fields[3] + '|'
            out_fp.write(line + '\n')
            #print(line)
    in_fp.close()
    out_fp.close()

def get_phonetics(word, option): 
    word = word.strip()
    url = "http://dict.youdao.com/w/eng/"+word
    try:
        response = urllib.request.urlopen(url).read()
    except urllib.error.URLError:
        return ""
    soup = BeautifulSoup(response, "html.parser")
    spans = soup.find_all('span', {'class' : 'pronounce'})
    lines = [span.get_text() for span in spans]
    match = re.findall(r'\[.+\]', lines[option - 1])
    if match:
        return match[0]
    return ""

if __name__ == '__main__':
    main()
