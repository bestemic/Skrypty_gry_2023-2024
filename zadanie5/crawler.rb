require "nokogiri"
require 'open-uri'
require 'json'  


Product = Struct.new(:title, :price) do
    def to_json(*options)
      to_h.to_json(*options)
    end
end

def get_results(keywords)
    search_url = "https://www.x-kom.pl/szukaj/?q=#{keywords}"
    return Nokogiri::HTML(URI.open(search_url))
end

def check_results(page)
    warn_div = page.at_css(".sc-4t5dgr-1.gelPcb")
    if warn_div
      puts "Results nof found for given keywords"
      exit
    end
end

def extract_data(page)
    products = []
    page.css(".sc-1s1zksu-0.dzLiED.sc-162ysh3-1.irFnoT").each do |product|
      title = product.css(".sc-16zrtke-0.dEIulL.sc-1yu46qn-9.ljYjYA").text
      price = product.at_css(".sc-fzqMAW.gHIvzZ.sc-bbhnby-0.jaYAiy").text
      products.append(Product.new(title, price))
    end
    return products
end

if ARGV.empty?
    puts "Usage: ruby crawler.rb <keyword>"
    exit
end

keywords =  ARGV.join().gsub(' ', "%20")
results_page = get_results(keywords)
check_results(results_page)

products = extract_data(results_page)
puts JSON.pretty_generate(products)