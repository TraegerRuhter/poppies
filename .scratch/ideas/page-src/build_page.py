import json, sys
tpl = open(sys.argv[1]).read()
data = open(sys.argv[2]).read()
data = data.replace('</', '<\\/')
open(sys.argv[3], 'w').write(tpl.replace('__DATA__', data))
