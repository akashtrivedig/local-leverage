class PincodeConverter():
    regex='[1-9]{1}[0-9]{5}'

    def to_python(self, value):
        return int(value)

    def to_url(self, value):
        return '%04d' % value