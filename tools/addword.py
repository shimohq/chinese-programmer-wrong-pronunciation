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
    britsh_eng = '[🔊](' + pronunciations[0][0] +')' + ' ' + pronunciations[0][1]
    american_eng = '[🔊](' + pronunciations[1][0] +')' + ' ' + pronunciations[1][1]
    line = '| ' + word + ' | ' + britsh_eng + ' | ' + american_eng + ' | ' + ' ' + '|'
    print(line)

def get_pronunciations(word):
    """Return the word's pronouciation URLs and phonetic transcriptions 
       from youdao.com if available"""
    word = word.strip()
    word_url = "http://dict.youdao.com/w/eng/"+word
    britsh_eng = [" ", "/ /"]
    american_eng = [" ","/ /"]
    try:
        response = urllib.request.urlopen(word_url).read()
        soup = BeautifulSoup(response, "html.parser")
        spans = soup.find_all('span', {'class' : 'pronounce'})
        lines = [span.get_text() for span in spans]
        match = re.findall(r'\[.+\]', lines[0])
        britsh_eng[0] = "http://dict.youdao.com/dictvoice?audio="+word+"&type=1"
        britsh_eng[1] = match[0].replace('[', '/').replace(']', '/')
        match = re.findall(r'\[.+\]', lines[1])
        american_eng[0] = "http://dict.youdao.com/dictvoice?audio="+word+"&type=2"
        american_eng[1] = match[0].replace('[', '/').replace(']', '/')
    except:
        return britsh_eng, american_eng 

    return britsh_eng, american_eng 

if __name__ == '__main__':
    main()
