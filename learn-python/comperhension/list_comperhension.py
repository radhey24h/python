'''
List comperhensive
'''
list_1=[1,2,3,4,5,6,7,8,9,12,13,14,15,16,17,18]

divide_by_2=[]
for item in list_1:
    if item%2==0:
        divide_by_2.append(item)

print('Without list comperhensive :- ',divide_by_2)

print('With list comperhensive :- ',[item for item in list_1 if item%2==0])
