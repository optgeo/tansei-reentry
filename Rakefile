desc 'Extract COPC metadata'
task :default do
  while true
    sh <<-EOS
TARGET=godo32/tansei \
ruby list.rb | ruby filter.rb | \
SERVER=http://tansei21.optgeo.org:10031 \
deno run --allow-read --allow-sys --allow-net --allow-env copc.ts | \
ruby write.rb
    EOS
  end
end

desc 'Create PMTiles from metadata'
task :pmtiles do
  sh <<-EOS
ruby to_geojsonseq.rb | tippecanoe -f -o tiles.mbtiles; 
pmtiles convert tiles.mbtiles docs/tiles.pmtiles; 
rm tiles.mbtiles
  EOS
end

desc 'Host the site for testing'
task :host do
  sh <<-EOS
budo -d docs
  EOS
end

desc 'Build style.json'
task :style do
  sh <<-EOS
charites build style.yml docs/style.json
  EOS
end

