'''
Syntax 

Lambda argument:manipulate(argument)

'''


def add(a, b):
    s = a+b
    return s


print(add(3, 4))


add_me_using_lambda_function= lambda x, y: x+y

print(add_me_using_lambda_function(5,5))

def add_me(x, y): return x+y

print(add_me(5, 5))
