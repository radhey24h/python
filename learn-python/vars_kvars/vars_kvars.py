# types of *args is tuple 

def function_1(*a):
    print(type(a))
    print('the name of student is,', a[0], 'age is ', a[1], 'and roll no is', a[2])

lis=['radhey', 2, '6 month']
print(type(lis))
function_1(*lis)


# types of *kvargs is key value

def print_key_value(**key_value):
    print(type(key_value))
    print('name', 'marks')
    for key, value in key_value.items():
        print(key, value)

marklist={'radhey':100, 'mishra':99}
print_key_value(**marklist)

def master_function(normal_parameter, *a, **b):
    print(normal_parameter)
    print('the name of student is,', a[0], 'age is ', a[1], 'and roll no is', a[2])
    for key, value in b.items():
        print(key, value)

master_function('code with concept', *lis, **marklist)