require "nokogiri"
require 'open-uri'
require 'json'  

BASE_URL = "https://www.x-kom.pl"

Product = Struct.new(:title, :price, :link, :manufacturer_name, :manufacturer_id, :xcom_id, :rating, :is_available, :color) do
    def to_json(*options)
        to_h.to_json(*options)
    end
end

Details = Struct.new(:manufacturer_name, :manufacturer_id, :xcom_id, :rating, :is_available, :color) do
    def to_json(*options)
        to_h.to_json(*options)
    end
end

def get_results(keywords)
    search_url = "#{BASE_URL}/szukaj/?q=#{keywords}"
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
        price = product.css(".sc-fzqMAW.gHIvzZ.sc-bbhnby-0.jaYAiy").text
        link = BASE_URL + product.at_css("a")["href"]
        details = get_details(link)
        products.append(Product.new(title, price, link, details.manufacturer_name, details.manufacturer_id, details.xcom_id, details.rating, details.is_available, details.color))
    end
    return products
end

def get_details(link)
    page = Nokogiri::HTML(URI.open(link))
    manufacturer_name = page.css(".sc-1h16fat-0.sc-1liasqt-1.cbXtmI").text
    manufacturer_id = page.css(".sc-1bker4h-7.foUWkj").text.gsub(/.*: /, '')
    xcom_id = page.css(".sc-1bker4h-9.eNJbkh").text.gsub(/.*: /, '')
    rating = page.css(".sc-1cbpuwv-1.fkAwTu").text.gsub(',', '.').to_f
    is_available = page.css(".sc-fvs7b3-1.jrqQVX").text == "Dostępny"
    div = page.at_xpath('//div[count(div) = 2 and div/div[text()="Kolor"]]')
    if div
        color = div.css('div').last.text
    else
        color = nil
    end
    return Details.new(manufacturer_name, manufacturer_id, xcom_id, rating, is_available, color)
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