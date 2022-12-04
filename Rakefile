task :default do
  sh <<-EOS
TARGET=godo32/tansei \
ruby list.rb | ruby filter.rb | \
SERVER=http://192.168.10.128:10031 \
deno run --allow-read --allow-sys --allow-net --allow-env copc.ts | \
ruby write.rb
  EOS
end
