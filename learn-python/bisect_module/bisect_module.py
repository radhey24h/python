import bisect as bi

# we use bisect module for

list_1=[1,2,4,5,6,7,8,9]
print(list_1)

number =10
print(bi.bisect(list_1, number))

bi.insort(list_1, number)

print(list_1)