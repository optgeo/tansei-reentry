list = `mc ls #{ENV['TARGET']}`.split("\n")
$stderr.print "#{list.size} on the object storage.\n"
list.each {|l|
  print l.split[-1], "\n"
}

