const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\User\\Downloads\\zo_ik';
const files = ['index.html', 'shop.html', 'product.html', 'about.html', 'contact.html', 'cart.html'];

// Complete English to Georgian Dictionary
const dict = {
  // Navigation & Globals
  "Furniture House Zoik": "Furniture House Zoik",
  "Est. 2008 · Premium Furniture": "დაარსდა 2008 · პრემიუმ ავეჯი",
  "Home": "მთავარი",
  "Shop": "კატალოგი",
  "About": "ჩვენ შესახებ",
  "Contact": "კონტაქტი",
  "Cart": "კალათა",
  "Search": "ძიება",

  // Index Hero
  "New Collection 2026": "ახალი კოლექცია 2026",
  "Where <em>Craft</em><br>Meets Home": "სადაც <em>ხელოვნება</em><br>ხვდება სახლს",
  "Handcrafted furniture that transforms your space into a sanctuary. Every piece tells a story of exceptional materials and timeless design.": "ხელნაკეთი ავეჯი, რომელიც თქვენს სივრცეს სიმყუდროვედ აქცევს. თითოეული ნივთი გამორჩეული მასალებისა და დროული დიზაინის ისტორიას ყვება.",
  "Explore Collection": "კოლექციის ნახვა",
  "Our Story": "ჩვენი ისტორია",
  "Scroll": "ჩამოსქროლეთ",

  // Stats
  "Years of Craft": "წლიანი გამოცდილება",
  "Unique Designs": "უნიკალური დიზაინი",
  "Happy Homes": "ბედნიერი ოჯახი",
  "Sustainable Wood": "მდგრადი მერქანი",

  // Product Actions & Badges
  "Bestsellers": "ბესტსელერები",
  "Bestseller": "ბესტსელერი",
  "Our Most Loved Pieces": "ჩვენი ყველაზე საყვარელი ნივთები",
  "View All Products": "ყველა პროდუქტის ნახვა",
  "Add to Cart": "კალათაში დამატება",
  "View Details": "დეტალების ნახვა",
  "Sale": "ფასდაკლება",
  "New": "ახალი",

  // Categories
  "Browse By Room": "დაათვალიერეთ ოთახების მიხედვით",
  "Shop by Category": "კატეგორიების მიხედვით",
  "Living Room": "მისაღები ოთახი",
  "Bedroom": "საძინებელი",
  "Dining": "სასადილო",
  "Office": "ოფისი",
  "Outdoor": "ეზო",
  "32 Products": "32 პროდუქტი",
  "24 Products": "24 პროდუქტი",
  "18 Products": "18 პროდუქტი",
  "14 Products": "14 პროდუქტი",
  "20 Products": "20 პროდუქტი",
  
  // Brand Story Teaser
  "Furniture Made With Intention": "ავეჯი შექმნილი მიზნით",
  "Since 2008, Furniture House Zoik has been crafting pieces that bridge the gap between artisan tradition and contemporary living. Every curve, joint, and finish is considered with care.": "2008 წლიდან, Furniture House Zoik ქმნის ავეჯს, რომელიც აკავშირებს ტრადიციულ ხელოსნობასა და თანამედროვე ცხოვრების სტილს. თითოეული დეტალი საგულდაგულოდ არის გააზრებული.",
  "We source only from FSC-certified forests and partner with local craftspeople who share our belief that truly great furniture should outlast trends — and last generations.": "ჩვენ ვიყენებთ მხოლოდ FSC-სერტიფიცირებულ ხე-ტყეს და ვთანამშრომლობთ ადგილობრივ ხელოსნებთან, რომლებიც იზიარებენ ჩვენს რწმენას - ნამდვილად კარგი ავეჯი თაობებს უნდა ემსახუროს.",
  "Read Our Story": "წაიკითხეთ ჩვენი ისტორია",

  // New Arrivals
  "Just Arrived": "ახალი დამატებული",
  "New Additions": "ახალი კოლექცია",
  "Shop Everything": "ყველაფრის ყიდვა",

  // Newsletter
  "Join Our World": "შემოგვიერთდით",
  "Get Design Inspiration Delivered": "მიიღეთ დიზაინის ინსპირაცია",
  "Subscribe for exclusive offers, new collection launches, interior design tips and early access to sales — straight to your inbox.": "გამოიწერეთ ექსკლუზიური შეთავაზებები, ახალი კოლექციები, ინტერიერის დიზაინის რჩევები და ფასდაკლებები.",
  "Your email address": "თქვენი ელ. ფოსტა",
  "Subscribe": "გამოწერა",
  "No spam ever. Unsubscribe anytime.": "არანაირი სპამი. გამოწერის გაუქმება ნებისმიერ დროს შეგიძლიათ.",

  // Footer
  "Premium Furniture Since 2008": "პრემიუმ ავეჯი 2008 წლიდან",
  "Crafting spaces that feel like home. Every piece we create is designed with intention, built with care, and made to last a lifetime.": "ვქმნით სივრცეებს, სადაც თავს სახლში იგრძნობთ. თითოეული ნივთი იქმნება ზრუნვით, რათა დიდხანს გემსახუროთ.",
  "Quick Links": "სწრაფი ბმულები",
  "Shop All": "ყველა პროდუქტი",
  "Contact Us": "კონტაქტი",
  "Cart & Checkout": "კალათა და გადახდა",
  "Categories": "კატეგორიები",
  "© 2026 Furniture House Zoik. All rights reserved.": "© 2026 Furniture House Zoik. ყველა უფლება დაცულია.",

  // Products
  "Nordic Lounge Chair": "სკანდინავიური სავარძელი",
  "Walnut Coffee Table": "კაკლის ყავის მაგიდა",
  "Haven Sectional Sofa": "Haven კუთხის დივანი",
  "Marble Dining Set": "მარმარილოს სასადილო მაგიდა",
  "Oak Platform Bed": "მუხის საწოლი",
  "Walnut Executive Desk": "კაკლის საოფისე მაგიდა",
  "Emerald Velvet Chair": "ზურმუხტისფერი ხავერდის სავარძელი",
  "Teak Garden Loveseat": "ტიკის ბაღის სავარძელი",
  "Bronte Bookshelf": "Bronte წიგნების თარო",
  "Club Leather Armchair": "ტყავის სავარძელი",

  // Shop Page
  "Shop Our Collection": "ჩვენი კოლექცია",
  "Handcrafted pieces for every room in your home": "ხელნაკეთი ნივთები თქვენი სახლის ყველა ოთახისთვის",
  "All Furniture": "ყველა ავეჯი",
  "Price Range": "ფასის დიაპაზონი",
  "Material": "მასალა",
  "All Materials": "ყველა მასალა",
  "Solid Wood": "მასიური ხე",
  "Leather": "ტყავი",
  "Fabric / Linen": "ქსოვილი / სელი",
  "Marble": "მარმარილო",
  "Teak / Outdoor": "ტიკი / ეზოსთვის",
  "Apply Filters": "ფილტრის გამოყენება",
  "Reset": "გასუფთავება",
  "Showing <strong>10</strong> products": "ნაჩვენებია <strong>10</strong> პროდუქტი",
  "Sort by:": "დახარისხება:",
  "Featured": "რეკომენდებული",
  "Price: Low to High": "ფასი: ზრდადობით",
  "Price: High to Low": "ფასი: კლებადობით",
  "Name A–Z": "სახელი A–Z",
  "All": "ყველა",

  // Product Page
  "Product": "პროდუქტი",
  "You May Also Like": "ასევე შეიძლება მოგეწონოთ",
  "Related Products": "მსგავსი პროდუქტები",
  "4.9 (128 reviews)": "4.9 (128 შეფასება)",
  "Our skilled craftspeople spend an average of 40 hours on each piece, ensuring that every detail meets our exacting standards. This piece is made to order and ships within 4–6 weeks.": "ჩვენი გამოცდილი ხელოსნები თითოეულ ნივთზე საშუალოდ 40 საათს ხარჯავენ. ეს ნივთი მზადდება შეკვეთით და იგზავნება 4-6 კვირაში.",
  "Dimensions": "ზომები",
  "Materials": "მასალები",
  "Weight": "წონა",
  "Finish": "ზედაპირი",
  "Shipping & Delivery": "მიწოდება",
  "Free white-glove delivery on orders over $500. Our team will bring your furniture to the room of your choice, unpack it, and place it exactly where you want it. Estimated delivery: 4–6 weeks for made-to-order pieces.": "უფასო პრემიუმ მიწოდება 500$-ზე მეტ შეკვეთებზე. ჩვენი გუნდი მოგიტანთ ავეჯს სასურველ ოთახში. მიწოდების დრო: 4-6 კვირა.",
  "Returns & Warranty": "დაბრუნება და გარანტია",
  "We stand behind every piece with a lifetime warranty against manufacturing defects. If you're not completely satisfied, we offer a 30-day hassle-free return policy. Simply contact us and we'll arrange a pickup.": "ჩვენ გთავაზობთ სამუდამო გარანტიას. თუ არ ხართ კმაყოფილი, შეგიძლიათ დააბრუნოთ 30 დღის განმავლობაში.",
  "Care Instructions": "მოვლის ინსტრუქცია",
  "Wipe wood surfaces with a dry or slightly damp cloth. Avoid placing in direct sunlight for prolonged periods. For upholstered pieces, spot clean with a mild detergent. Re-apply protective oil annually to wood surfaces.": "გაწმინდეთ ხის ზედაპირი მშრალი ან ოდნავ ნესტიანი ქსოვილით. მოერიდეთ მზის პირდაპირ სხივებს.",
  
  // Product Specs values
  "Full-grain leather, Walnut": "ნატურალური ტყავი, კაკალი",
  "Solid Walnut, Iron": "მასიური კაკალი, რკინა",
  "Belgian Linen, Hardwood": "ბელგიური სელი, მყარი ხე",
  "Calacatta Marble, Brass": "კალაკატას მარმარილო, თითბერი",
  "Solid Oak, Linen": "მასიური მუხა, სელი",
  "Black Walnut, Steel": "შავი კაკალი, ფოლადი",
  "Velvet, Brass Frame": "ხავერდი, თითბერის ჩარჩო",
  "Teak, Sunbrella": "ტიკი, Sunbrella ქსოვილი",
  "Solid Oak, Brass": "მასიური მუხა, თითბერი",
  "Natural Oil": "ნატურალური ზეთი",
  "Matte Lacquer": "გლუვი ლაქი",
  "Polished": "პრიალა",
  "Natural Wax": "ნატურალური ცვილი",
  "Matte Clear": "გლუვი გამჭვირვალე",
  "Natural Teak Oil": "ნატურალური ტიკის ზეთი",
  "Hand Rubbed": "ხელით დამუშავებული",
  "Antique Wax": "ანტიკვარული ცვილი",
  "N/A": "N/A",
  "42 lbs": "19 კგ",
  "65 lbs": "29 კგ",
  "180 lbs": "81 კგ",
  "220 lbs": "100 კგ",
  "145 lbs": "65 კგ",
  "95 lbs": "43 კგ",
  "38 lbs": "17 კგ",
  "88 lbs": "40 კგ",
  "110 lbs": "50 კგ",
  "68 lbs": "30 კგ",
  
  // Product specific desc
  "Ergonomically sculpted lounge chair in premium caramel leather with solid walnut legs. A timeless statement piece.": "ერგონომიული სავარძელი კარამელისფერ პრემიუმ ტყავში, კაკლის ფეხებით. დროული და გამორჩეული ნივთი.",
  "Solid walnut slab top with hairpin iron legs. Striking natural grain patterns make each piece truly one-of-a-kind.": "მასიური კაკლის ზედაპირი რკინის ფეხებით. ბუნებრივი ხის ფაქტურა თითოეულ ნივთს უნიკალურს ხდის.",
  "Oversized L-shaped sectional in Belgian linen. Deep cushions and a chaise for ultimate relaxation.": "დიდი ზომის კუთხის დივანი ბელგიურ სელში. ღრმა ბალიშები იდეალური დასვენებისთვის.",
  "Round Calacatta marble top with brushed brass base, paired with six sage velvet dining chairs.": "მრგვალი კალაკატას მარმარილოს ზედაპირი თითბერის ბაზით და 6 ხავერდის სკამით.",
  "Low-profile solid oak bed with a tufted linen headboard. Brings calm, grounded elegance to any bedroom.": "დაბალი პროფილის მუხის საწოლი სელის თავით. შემოაქვს სიმშვიდე და ელეგანტურობა საძინებელში.",
  "Dark walnut surface with a rigid steel frame. Ample workspace with a refined, minimal footprint.": "მუქი კაკლის ზედაპირი ფოლადის ჩარჩოთი. დიდი სამუშაო სივრცე დახვეწილი დიზაინით.",
  "Jewel-toned tufted wingback armchair with brushed gold legs. A bold focal point for any living space.": "ხავერდის სავარძელი ოქროსფერი ფეხებით. თვალისმომჭრელი დეტალი თქვენი მისაღებისთვის.",
  "Grade-A teak loveseat with Sunbrella cushions. Weather-resistant and beautifully aged for outdoor living.": "უმაღლესი ხარისხის ტიკის სავარძელი წყალგამძლე ბალიშებით.",
  "Solid oak open shelving with brass joinery. Six tiers of beautifully styled storage for books and objects.": "მასიური მუხის ღია თაროები თითბერის დეტალებით. 6 დონე წიგნებისა და დეკორისთვის.",
  "Full-grain cognac leather with button tufting and nailhead trim. Brings a warm, timeless character to any study or sitting room.": "ნატურალური კონიაკისფერი ტყავი კლასიკური დეტალებით. შემოაქვს სითბო ნებისმიერ ოთახში.",

  // About Page
  "Furniture Born from<br>Passion & Purpose": "ავეჯი შექმნილი<br>ვნებითა და მიზნით",
  "In 2008, founder Marcus Zoik opened a small workshop in Brooklyn with a simple belief: furniture should be made to last — and made to matter.": "2008 წელს, დამფუძნებელმა მარკუს ზოიკმა გახსნა პატარა სახელოსნო ბრუკლინში, მარტივი რწმენით: ავეჯი უნდა იყოს გამძლე და მნიშვნელოვანი.",
  "Starting with a single oak dining table crafted for his own home, Marcus quickly realised there was a hunger for furniture that balanced honest craftsmanship with contemporary design. Today, Furniture House Zoik employs 60+ artisans and ships to homes across North America and Europe.": "დაიწყო რა საკუთარი სახლისთვის შექმნილი ერთი მუხის მაგიდით, მარკუსმა მალევე აღმოაჩინა მოთხოვნა ხარისხიან და თანამედროვე ავეჯზე. დღეს ჩვენ 60-ზე მეტ ხელოსანს ვაერთიანებთ.",
  "Years Making": "წელი წარმოებაში",
  "Artisans": "ხელოსანი",
  "What We Stand For": "რისი გვწამს",
  "Our Core Values": "ჩვენი მთავარი ფასეულობები",
  "Sustainability First": "მდგრადობა უპირველეს ყოვლისა",
  "Every piece of wood we use comes from FSC-certified forests. We offset 100% of our carbon emissions and use water-based finishes wherever possible.": "ჩვენი ხე-ტყე მხოლოდ სერტიფიცირებული ტყეებიდან მოდის. ჩვენ ვზრუნავთ გარემოზე.",
  "Master Craftsmanship": "ოსტატობა",
  "Our artisans average over 15 years of experience. Many techniques are handed down through generations — dovetail joints, hand-planed surfaces, natural oil finishes.": "ჩვენს ოსტატებს აქვთ საშუალოდ 15 წლიანი გამოცდილება. ტრადიციული ტექნიკა თაობებს გადაეცემა.",
  "Built to Last": "შექმნილია საუკუნოდ",
  "We offer a lifetime warranty on every piece. We believe furniture should outlast trends, outlast decades, and eventually become a family heirloom.": "ჩვენ გთავაზობთ სამუდამო გარანტიას. ავეჯი უნდა უძლებდეს დროს.",
  "Thoughtful Design": "გააზრებული დიზაინი",
  "Our in-house design team draws inspiration from Scandinavian minimalism, Japanese wabi-sabi, and California modernism to create timeless, livable pieces.": "ჩვენი დიზაინერები შთაგონებას იღებენ სკანდინავიური მინიმალიზმიდან და იაპონური ესთეტიკიდან.",
  "Fair Trade Partners": "სამართლიანი პარტნიორობა",
  "We pay living wages, provide full benefits, and invest in our team's professional development. Great furniture starts with great people who are treated well.": "ჩვენ ვზრუნავთ ჩვენს გუნდზე, რადგან კარგი ავეჯი იწყება ბედნიერი ადამიანებით.",
  "Home Is Sacred": "სახლი წმინდაა",
  "We understand that inviting a piece of furniture into your home is a deeply personal act. Our free in-home consultation service ensures every piece is perfectly placed.": "ჩვენ გვესმის, რომ სახლში ახალი ნივთის შემოტანა პირადი გადაწყვეტილებაა. ჩვენ დაგეხმარებით იდეალური ადგილის პოვნაში.",
  "Our Journey": "ჩვენი გზა",
  "From Workshop to World": "სახელოსნოდან მსოფლიოსკენ",
  "The First Workshop": "პირველი სახელოსნო",
  "Marcus Zoik opens a 400 sq ft workshop in Brooklyn, NY. His first piece — a hand-planed walnut dining table — sells within a week.": "მარკუს ზოიკი ხსნის პატარა სახელოსნოს. მისი პირველი ნამუშევარი 1 კვირაში იყიდება.",
  "First Flagship Showroom": "პირველი შოურუმი",
  "We open our first showroom in Manhattan's Design District, featuring 30 original designs. Demand grows beyond what our small workshop can handle.": "ჩვენ ვხსნით შოურუმს მანჰეტენზე 30 ორიგინალური დიზაინით.",
  "The Zoik Collection": "Zoik-ის კოლექცია",
  "Launch of the signature Zoik Collection — 12 iconic pieces that define our aesthetic. The Nordic Lounge Chair becomes our bestseller.": "გამოვუშვით საფირმო კოლექცია 12 საკულტო ნივთით.",
  "Sustainability Pledge": "გარემოს დაცვის პირობა",
  "We achieve carbon-neutral certification and commit to 100% FSC-certified wood across all collections. Named 'Most Sustainable Furniture Brand' by Architectural Digest.": "ჩვენ გავხდით ნახშირბად-ნეიტრალურები და ვიყენებთ მხოლოდ სერტიფიცირებულ ხეს.",
  "European Expansion": "გაფართოება ევროპაში",
  "Furniture House Zoik opens showrooms in London and Copenhagen, bringing our warmth and craft to new homes across Europe.": "ვხსნით შოურუმებს ლონდონსა და კოპენჰაგენში.",
  "The Future of Home": "სახლის მომავალი",
  "We launch our new 'Heirloom' custom collection — fully bespoke pieces with a 100-year guarantee, designed to become tomorrow's antiques.": "გამოვუშვით პრემიუმ კოლექცია 'Heirloom' 100-წლიანი გარანტიით.",
  "The People Behind The Pieces": "ადამიანები ნივთების უკან",
  "Meet Our Team": "გაიცანით ჩვენი გუნდი",
  "Founder & Head of Design": "დამფუძნებელი და მთავარი დიზაინერი",
  "Trained carpenter and designer with 20+ years of experience. Marcus's hands-on approach ensures every Zoik piece meets the highest standard of craft.": "გამოცდილი დურგალი და დიზაინერი 20+ წლიანი გამოცდილებით. მისი პროფესიონალიზმი უზრუნველყოფს უმაღლეს ხარისხს.",
  "Creative Director": "კრეატიული დირექტორი",
  "Former architect and interior designer, Elena leads our design team in creating collections that are as beautiful as they are livable. Her eye for proportion is unmatched.": "ყოფილი არქიტექტორი ელენა ხელმძღვანელობს ჩვენს დიზაინერებს, რათა შექმნან ლამაზი და პრაქტიკული კოლექციები.",
  "Head of Sustainability": "მდგრადობის ხელმძღვანელი",
  "James has dedicated his career to ensuring our supply chain is ethical and environmentally sound. He personally visits every supplier twice a year.": "ჯეიმსი ზრუნავს ჩვენი წარმოების ეთიკურობასა და ეკოლოგიურობაზე.",
  "Ready to Begin?": "მზად ხართ დაიწყოთ?",
  "Find Your Perfect Piece": "იპოვეთ თქვენი იდეალური ნივთი",
  "Browse our full collection and discover furniture that will make your house truly feel like home.": "დაათვალიერეთ ჩვენი კოლექცია და აღმოაჩინეთ ავეჯი, რომელიც შექმნის იდეალურ გარემოს.",
  "Shop the Collection": "კოლექციის ნახვა",
  "Schedule a Consultation": "კონსულტაციის დაჯავშნა",

  // Contact Page
  "Get In Touch": "დაგვიკავშირდით",
  "We'd love to hear from you. Our team typically responds within one business day.": "ჩვენ სიამოვნებით მოგისმენთ. ჩვენი გუნდი გიპასუხებთ 1 სამუშაო დღეში.",
  "Let's Talk": "მოდით ვისაუბროთ",
  "Whether you have a question about a product, need design advice, or want to schedule a showroom visit — we're here for you.": "თუ გაქვთ კითხვა პროდუქტზე, გჭირდებათ რჩევა დიზაინზე, ან გსურთ შოურუმის ვიზიტი - ჩვენ აქ ვართ.",
  "Showroom Address": "შოურუმის მისამართი",
  "48 Craftsman Lane, Design District<br>New York, NY 10001, USA": "48 Craftsman Lane, დიზაინის უბანი<br>ნიუ-იორკი, აშშ",
  "Phone": "ტელეფონი",
  "Email": "ელ. ფოსტა",
  "Business Hours": "სამუშაო საათები",
  "Monday – Friday": "ორშაბათი - პარასკევი",
  "Saturday": "შაბათი",
  "Sunday": "კვირა",
  "9:00 AM – 7:00 PM": "9:00 - 19:00",
  "10:00 AM – 6:00 PM": "10:00 - 18:00",
  "11:00 AM – 5:00 PM": "11:00 - 17:00",
  "Send Us a Message": "მოგვწერეთ შეტყობინება",
  "Fill in the form below and we'll get back to you as soon as possible.": "შეავსეთ ფორმა და ჩვენ მალევე დაგიკავშირდებით.",
  "First Name": "სახელი",
  "First Name *": "სახელი *",
  "Last Name": "გვარი",
  "Last Name *": "გვარი *",
  "Email Address *": "ელ. ფოსტა *",
  "Phone Number": "ტელეფონი",
  "Subject *": "თემა *",
  "Select a subject...": "აირჩიეთ თემა...",
  "Product Inquiry": "კითხვა პროდუქტზე",
  "Order Status": "შეკვეთის სტატუსი",
  "Interior Design Consultation": "ინტერიერის დიზაინის კონსულტაცია",
  "Custom Order": "ინდივიდუალური შეკვეთა",
  "General Question": "ზოგადი კითხვა",
  "Message *": "შეტყობინება *",
  "Tell us how we can help you...": "გვითხარით რით შეგვიძლია დაგეხმაროთ...",
  "Send Message": "შეტყობინების გაგზავნა",

  // Cart Page
  "Cart & Checkout": "კალათა და გადახდა",
  "Review your cart and complete checkout at Furniture House Zoik. Free white-glove delivery on orders over $500.": "გადაამოწმეთ კალათა და დაასრულეთ შეკვეთა. უფასო მიწოდება 500$-ის ზემოთ.",
  "Shipping": "მიწოდება",
  "Payment": "გადახდა",
  "Confirm": "დადასტურება",
  "Your Cart": "თქვენი კალათა",
  "Continue Shopping": "ყიდვის გაგრძელება",
  "Order Summary": "შეკვეთის შეჯამება",
  "Subtotal": "ჯამი (მიწოდების გარეშე)",
  "Tax (8.875%)": "გადასახადი (8.875%)",
  "Promo Code": "პრომო კოდი",
  "Total": "სულ ჯამი",
  "Apply": "გამოყენება",
  "Proceed to Checkout": "გადახდაზე გადასვლა",
  "Secure checkout · SSL encrypted": "უსაფრთხო გადახდა · SSL დაშიფრული",
  "Free white-glove delivery on orders over $500": "უფასო მიწოდება 500$-ზე მეტ შეკვეთებზე",
  "30-day hassle-free returns": "30-დღიანი უფასო დაბრუნება",
  "Lifetime warranty on all products": "სამუდამო გარანტია ყველა პროდუქტზე",
  "Shipping Information": "ინფორმაცია მიწოდებაზე",
  "Street Address": "ქუჩის მისამართი",
  "City": "ქალაქი",
  "ZIP Code": "საფოსტო ინდექსი",
  "Payment Details": "გადახდის დეტალები",
  "Card Number": "ბარათის ნომერი",
  "Expiry Date": "მოქმედების ვადა",
  "CVV": "CVV",
  "Name on Card": "სახელი ბარათზე",
  "Place Order": "შეკვეთის გაფორმება",
  "Back to Cart": "კალათაში დაბრუნება",
  "Order Confirmed!": "შეკვეთა დადასტურებულია!",
  "Thank you for your order. You'll receive a confirmation email shortly with your order details and estimated delivery date.": "მადლობა შეკვეთისთვის. თქვენ მიიღებთ დასტურს ელ. ფოსტაზე შეკვეთის დეტალებით.",
  "Back to Home": "მთავარ გვერდზე დაბრუნება",
  "Free": "უფასო",
  "Your cart is empty": "თქვენი კალათა ცარიელია",
  "Start Shopping": "ყიდვის დაწყება",
  "Remove": "წაშლა",
  "In Stock · Ships in 4–6 weeks": "მარაგშია · გაიგზავნება 4-6 კვირაში",
};

// Also we need to export this dictionary to the browser so the JS can switch BACK to English
// I will rewrite \`translations.js\` completely.

let clientTranslations = 'const translations = {\\n';
for (const [en, ge] of Object.entries(dict)) {
    // English is english, Georgian is georgian. 
    // The keys will be the Georgian text (since we will write Georgian to the HTML files)
    // Actually, no! If the HTML has Georgian, the JS needs to look up the element by data-i18n,
    // OR we can just keep the keys as EN. 
    // Let's create an auto-generated data-i18n key for each string.
}

// But wait, the easiest way to translate ALL text is to literally find-replace in the HTML strings.
// But we also need to support the English toggle!
// Let's build a new translate strategy:
// 1. Give every English string a hash key.
// 2. Wrap all matching text in the HTML with \`<span data-i18n="hash">\` OR just replace the HTML with Georgian and inject data-i18n.
// This is getting complex to do via Regex in HTML without breaking attributes (like placeholder="Email").

// Instead, let's keep the HTML in Georgian by directly translating it.
// And inject a robust \`lang.js\` that has the EN dictionary, and it just searches for elements by XPath or we just use our text-node matching.

console.log("Translation script started");

// We'll replace the strings in the HTML files. We must be careful to match exact strings, including tags like <em>.
for (let file of files) {
  let p = path.join(dir, file);
  let html = fs.readFileSync(p, 'utf8');

  // Set html lang
  html = html.replace('<html lang="en">', '<html lang="ge">');
  
  // Replace all occurrences in HTML.
  // Sort dict by length descending so we replace longer strings first to avoid partial matches
  const sortedKeys = Object.keys(dict).sort((a,b) => b.length - a.length);

  for (const en of sortedKeys) {
    const ge = dict[en];
    
    // We want to replace \`>English<\` with \`>Georgian<\` to avoid replacing inside tag names or class names.
    // However, some strings are in placeholders: \`placeholder="English"\`
    
    // Replace in element text content
    // We need to handle cases where there might be spaces/newlines.
    // Just global string replacement for the exact string:
    // We'll use split-join for exact string replacements.
    // Warning: this could accidentally replace class names if they match exactly, but our dictionary strings are sentences/words with spaces or capitals.
    
    // To be safe, we will specifically replace exact matches.
    html = html.split(en).join(ge);
  }

  // Also replace some specific attributes if missed
  fs.writeFileSync(p, html);
  console.log('Translated ' + file);
}

// Write the client-side translation file.
// The client side needs to switch back from GE to EN.
let clientJS = 'const translations = {\\n';
for (const [en, ge] of Object.entries(dict)) {
  const geStr = ge.replace(/"/g, '\\\\\"');
  const enStr = en.replace(/"/g, '\\\\\"');
  clientJS += '  "' + geStr + '": "' + enStr + '",\\n';
}
clientJS += '};\n';
fs.writeFileSync(path.join(dir, 'translations.js'), clientJS);
console.log('Wrote translations.js');

// Done

