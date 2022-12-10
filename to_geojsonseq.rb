require 'lmdb'
require 'json'

db = LMDB.new('extents').database

count = db.size
$stderr.print "db size is #{count}.\n"

db.each {|k, v|
  f = JSON.parse(v) 
  f['tippecanoe'] = {
    :layer => 'grid',
    :minzoom => 8,
    :maxzoom => 14
  }
  print "\x1e#{JSON.dump(f)}\n"
}

