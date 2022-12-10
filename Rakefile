task :default do
  while true
    sh <<-EOS
TARGET=godo32/tansei \
ruby list.rb | ruby filter.rb | \
SERVER=http://192.168.10.128:10031 \
deno run --allow-read --allow-sys --allow-net --allow-env copc.ts | \
ruby write.rb
    EOS
  end
end

task :pmtiles do
  sh <<-EOS
ruby to_geojsonseq.rb | tippecanoe -f -o tiles.mbtiles; 
pmtiles convert tiles.mbtiles docs/tiles.pmtiles; 
rm tiles.mbtiles
  EOS
end
