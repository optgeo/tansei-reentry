require 'lmdb'

db = LMDB.new('extents').database

while gets
  grid = $_.strip.downcase.sub('.copc.laz', '')
  if db[grid]
    $stderr.print "skip #{grid} because already recorded.\n"
  else
    print $_
  end
end

