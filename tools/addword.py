#!/usr/bin/env python3.8
# -*- coding: UTF-8 -*-
"""
Create the description for a word to be added to the word list
Usage: addword.py <word>
"""
import sys
import re
import urllib.request
from bs4 import BeautifulSoup

def main():
    """Generate the information with pronunciations for a word to be added to the word list"""
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(1)
    word = sys.argv[1]
    pronunciations = get_pronunciations(word)
    britsh_en = '[🔊](' + pronunciations[0][0] +')' + ' ' + '/' + pronunciations[0][1] + '/'
    american_en = '[🔊](' + pronunciations[1][0] +')' + ' ' + '/' + pronunciations[1][1] + '/'
    line = '| ' + word + ' | ' + britsh_en + ' | ' + american_en + ' | ' + ' ' + '|'
    print(line)

def get_pronunciations(word):
    """Return the word's pronouciation URLs and phonetic transcriptions
       from youdao.com if available"""
    word = word.strip()
    word_url = "https://dict.youdao.com/w/en/"+word
    pron_url = "https://dict.youdao.com/dictvoice?audio="+word+"&"
    britsh_en = [" ", " "]
    american_en = [" "," "]
    try:
        response = urllib.request.urlopen(word_url).read()
        soup = BeautifulSoup(response, "html.parser")
        spans = soup.find_all('span', {'class' : 'pronounce'})
        lines = [span.get_text() for span in spans]
        match = re.findall(r'\[.+\]', lines[0])
        britsh_en[0] = pron_url + "type=1"
        britsh_en[1] = match[0].replace('[', '').replace(']', '')
        match = re.findall(r'\[.+\]', lines[1])
        american_en[0] = pron_url + "type=2"
        american_en[1] = match[0].replace('[', '').replace(']', '')
    except:
        return britsh_en, american_en

    return britsh_en, american_en

if __name__ == '__main__':
    main()
