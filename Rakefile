
task :jsl do
  def jsl_file(filename)
    puts `jsl -process #{filename}`
  end
  
  Dir.glob("**/*.js").each do |file|
    unless file =~ /vendor/
      jsl_file(file)
    end
  end
end