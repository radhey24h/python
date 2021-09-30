def gen(n):
    for i in range(n):
        yield i

object1=gen(100)
print(next(object1))
print(next(object1))
print(next(object1))