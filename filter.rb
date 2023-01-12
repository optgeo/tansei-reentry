require 'lmdb'
SLEEP = 1

db = LMDB.new('extents').database

while gets
  grid = $_.strip.downcase.sub('.copc.laz', '')
  if db[grid]
    $stderr.print "skip #{grid} because already recorded.\r"
  else
    print $_
    ## $stderr.print "filter sleeping #{SLEEP} sec after sending #{grid}\r"
    sleep(SLEEP) ##
  end
end

