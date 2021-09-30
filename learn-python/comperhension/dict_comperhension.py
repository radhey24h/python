'''
Dictionary comperhensive
'''
dict_1 = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8,
          'i': 9, 'j': 12, 'B': 13, 'C': 14, 'D': 15, 'E': 16, 'F': 17, 'G': 18}


print('With dict comperhensive' ':- ', {item.lower(): dict_1.get(
    item.lower(), 0) + dict_1.get(item.upper(), 0) for item in dict_1.keys()})
