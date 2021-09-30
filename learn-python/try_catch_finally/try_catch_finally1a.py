try:
    open('this1.txt')
except EOFError as e:
    print('eof error')
except IOError as e:
    print('we can handle this error')
finally:
    print('i am on finally stage..!!!')