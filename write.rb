require 'lmdb'
require 'json'

db = LMDB.new('extents').database

count = db.size
$stderr.print "initial db size is #{count}.\n"

while gets
  f = JSON.parse($_.strip) 
  grid = f['properties']['grid']
  db[grid] = $_.strip
  count += 1
  $stderr.print "#{Time.now.to_s} ##{count}: #{grid}\n"
end

