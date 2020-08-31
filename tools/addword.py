#!/usr/bin/env python3.8
# -*- coding: UTF-8 -*-
"""
Create description for a word to be added to the word list
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
    prons = get_pronunciation_files(word)
    phones = get_phonetic_transcriptions(word)
    britsh_eng = '[🔊]('+prons[0]+')' + ' ' + phones[0]
    american_eng = '[🔊]('+prons[1]+')' + phones[1]
    line = '| ' + word + ' | ' + britsh_eng + ' | ' + american_eng + ' | ' + ' ' + '|'
    print(line)

def get_pronunciation_files(word):
    """Return the word's prounciation files from youdao.com if available
       (British English and American English) as a list"""
    word = word.strip()
    prons = []
    url = "http://dict.youdao.com/dictvoice?audio="+word+"&type=1"
    try:
        urllib.request.urlopen(url).read()
        prons.append(url)
    except urllib.error.URLError:
        return prons

    url = re.sub("type=1", "type=2", url)
    try:
        urllib.request.urlopen(url).read()
        prons.append(url)
        return prons
    except urllib.error.URLError:
        return prons

def get_phonetic_transcriptions(word):
    """Return the word's phonetic transcriptions from youdao.com if available
       British English and American English as a list"""
    word = word.strip()
    url = "http://dict.youdao.com/w/eng/"+word
    phones = []
    try:
        response = urllib.request.urlopen(url).read()
    except urllib.error.URLError:
        return phones
    soup = BeautifulSoup(response, "html.parser")
    spans = soup.find_all('span', {'class' : 'pronounce'})
    lines = [span.get_text() for span in spans]
    match = re.findall(r'\[.+\]', lines[0])
    if match:
        phones.append(match[0])
    else:
        phones.append(" ")
    match = re.findall(r'\[.+\]', lines[1])
    if match:
        phones.append(match[0])
    else:
        phones.append(" ")
    return phones

if __name__ == '__main__':
    main()
