try:
    print('I will try my code and if there will be any issue i will raise it..!!')
except Exception as e:
    print('i will run if try block will fail..!!')
else:
    print('I will run only if there is no exception, use this to run code which should only excute if there is no any exception..!!')
finally:
    print('finally done..!!')