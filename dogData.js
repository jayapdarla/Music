const dogBreeds = [
    {
        id: 'golden-retriever',
        name: 'Golden Retriever',
        image: 'assets/golden_retriever.png',
        lifespan: '10–12 years',
        facts: [
            'Highly intelligent and easy to train.',
            'Famous for their gentle and friendly temperament.',
            'They love water and are natural swimmers.',
            'Excellent family pets and service dogs.'
        ],
        abilities: [
            'Exceptional search and rescue capabilities.',
            'Top-tier service and therapy work.',
            'Adept at bird flushing and retrieving.',
            'High emotional intelligence and empathy.'
        ],
        cons: [
            'Heavy shedders year-round.',
            'Require significant daily exercise.',
            'Prone to separation anxiety if left alone.',
            'Can be prone to obesity if not monitored.'
        ]
    },
    {
        id: 'german-shepherd',
        name: 'German Shepherd',
        image: 'assets/german_shepherd.png',
        lifespan: '9–13 years',
        facts: [
            'Known for courage and confidence.',
            'Highly versatile working dogs.',
            'Strong protective instincts.',
            'Very loyal to their family members.'
        ],
        abilities: [
            'Elite police and military service.',
            'Superior guarding and protection.',
            'Excellent tracking and scent work.',
            'High athletic agility.'
        ],
        cons: [
            'Can be wary of strangers.',
            'High shedding ("German Shedders").',
            'Need substantial mental stimulation.',
            'Prone to hip and elbow dysplasia.'
        ]
    },
    {
        id: 'bulldog',
        name: 'English Bulldog',
        image: 'assets/bulldog.png',
        lifespan: '10–12 years',
        facts: [
            'Calm, courageous, and friendly.',
            'Recognizable for their thick-set, low-slung body.',
            'Require minimal exercise compared to other breeds.',
            'Great companions for apartment living.'
        ],
        abilities: [
            'Excellent low-energy companionship.',
            'Naturally protective of their owners.',
            'Good with children due to patient nature.',
            'Strong endurance for their size in short bursts.'
        ],
        cons: [
            'Prone to overheating in warm weather.',
            'Respiratory issues due to flat face.',
            'Can be stubborn to train.',
            'Known for snoring and drooling.'
        ]
    },
    {
        id: 'poodle',
        name: 'Standard Poodle',
        image: 'assets/poodle.png',
        lifespan: '12–15 years',
        facts: [
            'One of the most intelligent dog breeds.',
            'Hypoallergenic coats (very low shedding).',
            'Originally bred as water retrievers.',
            'Very athletic and graceful.'
        ],
        abilities: [
            'High-level competitive obedience.',
            'Excellent agility and sport performance.',
            'Versatile hunters and water workers.',
            'Quick problem-solving skills.'
        ],
        cons: [
            'Require frequent professional grooming.',
            'Can become high-strung if bored.',
            'Prone to bloat (gastric torsion).',
            'May be sensitive to loud noises.'
        ]
    },
    {
        id: 'beagle',
        name: 'Beagle',
        image: 'assets/beagle.png',
        lifespan: '10–15 years',
        facts: [
            'Famous for their incredible sense of smell.',
            'Curious, merry, and outgoing.',
            'Bred as pack animals for hunting.',
            'Very vocal and expressive.'
        ],
        abilities: [
            'World-class scent detection.',
            'Excellent tracking capabilities.',
            'High social intelligence with other dogs.',
            'Great endurance for long walks.'
        ],
        cons: [
            'Can be very vocal (howling and baying).',
            'Strong prey drive makes them wander off.',
            'Notoriously stubborn to train.',
            'Prone to obesity due to food obsession.'
        ]
    },
    {
        id: 'labrador-retriever',
        name: 'Labrador Retriever',
        image: 'assets/labrador_retriever.png',
        lifespan: '10–12 years',
        facts: [
            'The most popular dog breed in the U.S. for years.',
            'Incredibly friendly and outgoing.',
            'Eager to please and easy to train.',
            'Equipped with an "otter tail" for swimming.'
        ],
        abilities: [
            'Exceptional retrieving skills.',
            'Top choice for guide and service work.',
            'Excellent swimmers and water workers.',
            'Versatile hunters and competitors.'
        ],
        cons: [
            'Extremely high energy levels.',
            'Moderate to heavy shedding.',
            'Prone to obesity if overfed.',
            'Need a lot of oral stimulation (chewers).'
        ]
    },
    {
        id: 'rottweiler',
        name: 'Rottweiler',
        image: 'https://images.unsplash.com/photo-1567171466295-4afa58145227?auto=format&fit=crop&q=80&w=800',
        lifespan: '8–10 years',
        facts: [
            'Originally bred to drive cattle to market.',
            'One of the oldest herding breeds.',
            'Calm, confident, and courageous.',
            'Deeply loyal and protective of their family.'
        ],
        abilities: [
            'Exceptional guarding and protection skills.',
            'Adept at police and military work.',
            'Strong search and rescue instincts.',
            'Surprisingly gentle therapy dogs.'
        ],
        cons: [
            'Can be stubborn and strong-willed.',
            'Requires extensive early socialization.',
            'Prone to obesity without exercise.',
            'Can be wary of strangers if not trained.'
        ]
    },
    {
        id: 'boxer',
        name: 'Boxer',
        image: 'https://images.unsplash.com/photo-1558322394-4d8813ceef8a?auto=format&fit=crop&q=80&w=800',
        lifespan: '10–12 years',
        facts: [
            'Known for their "goofy" and playful nature.',
            'Bred to be versatile working dogs.',
            'Extremely patient with children.',
            'Use their front paws for everything, hence the name.'
        ],
        abilities: [
            'Excellent watchdogs and guardians.',
            'Highly athletic and agile.',
            'Quick learners in obedience training.',
            'Natural entertainers and companions.'
        ],
        cons: [
            'Very high energy and boisterous.',
            'Prone to heart conditions and cancer.',
            'Can suffer from separation anxiety.',
            'Known for heavy snoring and drooling.'
        ]
    },
    {
        id: 'dachshund',
        name: 'Dachshund',
        image: 'https://images.unsplash.com/photo-1518378188025-22bd89516ee2?auto=format&fit=crop&q=80&w=800',
        lifespan: '12–16 years',
        facts: [
            'Bred in Germany to hunt badgers.',
            'Known affectionately as "Sausage Dogs."',
            'Iconic long body and short legs.',
            'Very brave and often unaware of their small size.'
        ],
        abilities: [
            'Superior scent-tracking capabilities.',
            'Vigilant and vocal watchdogs.',
            'Exceptional hunters in tight spaces.',
            'Highly intelligent and problem-solvers.'
        ],
        cons: [
            'Prone to back problems (IVDD).',
            'Can be very stubborn to train.',
            'Known for excessive barking.',
            'Difficult to house-train.'
        ]
    },
    {
        id: 'siberian-husky',
        name: 'Siberian Husky',
        image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800',
        lifespan: '12–15 years',
        facts: [
            'Bred by the Chukchi people for sled pulling.',
            'Known for their striking blue or multi-colored eyes.',
            'Possess a thick, beautiful double coat.',
            'Very social and friendly with people.'
        ],
        abilities: [
            'Unmatched endurance for long distances.',
            'Natural-born pack workers.',
            'Fast and powerful runners.',
            'Excellent at escaping (master artists).'
        ],
        cons: [
            'Extremely high energy needs.',
            'Heavy shedders (twice a year "blow-out").',
            'Strong prey drive and roaming instincts.',
            'Can be very vocal (howling and "talking").'
        ]
    },
    {
        id: 'great-dane',
        name: 'Great Dane',
        image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=800',
        lifespan: '6–10 years',
        facts: [
            'Known as the "Apollo of Dogs" for their grace.',
            'One of the tallest dog breeds in the world.',
            'Despite their size, they are gentle giants.',
            'Originally bred to hunt wild boars.'
        ],
        abilities: [
            'Imposing guardians and deterrents.',
            'Surprisingly good at agility for their size.',
            'Calm and patient indoor companions.',
            'Excellent weight-pulling capabilities.'
        ],
        cons: [
            'Very short lifespan (average 8 years).',
            'Require a lot of living space.',
            'High food and medical expenses.',
            'Prone to "bloat" (gastric torsion).'
        ]
    },
    {
        id: 'shih-tzu',
        name: 'Shih Tzu',
        image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800',
        lifespan: '10–18 years',
        facts: [
            'Name translates to "Little Lion Dog."',
            'Bred to be companions for Chinese royalty.',
            'Thrive on human attention and affection.',
            'Have a distinct underbite and square face.'
        ],
        abilities: [
            'Exceptional emotional support companions.',
            'Adaptable to apartment living.',
            'Quick at learning charming tricks.',
            'Very vigilant indoor watchdogs.'
        ],
        cons: [
            'Require daily professional grooming.',
            'Can be stubborn to house-train.',
            'Prone to breathing and eye issues.',
            'Sensitive to extreme heat.'
        ]
    },
    {
        id: 'border-collie',
        name: 'Border Collie',
        image: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&q=80&w=800',
        lifespan: '12–15 years',
        facts: [
            'Consistently ranked as the world\'s smartest dog.',
            'Known for the "intense stare" used in herding.',
            'Possess an incredible work ethic.',
            'Bred along the border of Scotland and England.'
        ],
        abilities: [
            'World-class herding and gathering skills.',
            'Top-tier agility and sport performance.',
            'Capable of learning hundreds of words.',
            'Exceptional problem-solving abilities.'
        ],
        cons: [
            'Require immense mental stimulation.',
            'Can become destructive if bored.',
            'Intense herding instincts (may nip heels).',
            'Not suitable for sedentary households.'
        ]
    },
    {
        id: 'corgi',
        name: 'Pembroke Welsh Corgi',
        image: 'https://images.unsplash.com/photo-1519098901909-b1553a1190af?auto=format&fit=crop&q=80&w=800',
        lifespan: '12–15 years',
        facts: [
            'Famously favored by Queen Elizabeth II.',
            'One of the oldest herding breeds.',
            'Smallest of the herding group dogs.',
            'Known for their "bunny-like" fluff and ears.'
        ],
        abilities: [
            'Expert at herding cattle by nipping heels.',
            'Surprisingly fast and agile for short legs.',
            'Highly alert and protective watchdogs.',
            'Quick-witted and eager to please.'
        ],
        cons: [
            'Prone to back problems (IVDD).',
            'Heavy year-round shedders.',
            'Can be very vocal and bossy.',
            'Prone to obesity if overfed.'
        ]
    },
    {
        id: 'australian-shepherd',
        name: 'Australian Shepherd',
        image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&q=80&w=800',
        lifespan: '12–15 years',
        facts: [
            'Despite the name, they were developed in the US.',
            'Known for their striking "merle" coat patterns.',
            'Incredibly intelligent and versatile workers.',
            'Often have two different colored eyes (heterochromia).'
        ],
        abilities: [
            'Exceptional herding and stock-driving.',
            'Top-tier agility and frisbee competitors.',
            'Excellent search and rescue capabilities.',
            'Highly effective service and therapy work.'
        ],
        cons: [
            'Extremely high energy and drive.',
            'Can become destructive if not kept busy.',
            'Prone to chasing cars and children.',
            'Shed heavily and require regular brushing.'
        ]
    },
    {
        id: 'cavalier',
        name: 'Cavalier King Charles Spaniel',
        image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=800',
        lifespan: '9–14 years',
        facts: [
            'Named after King Charles II of Great Britain.',
            'One of the largest toy breeds.',
            'Known as the "Ultimate Lap Dog."',
            'Extremely affectionate and gentle nature.'
        ],
        abilities: [
            'Exceptional comfort and therapy work.',
            'Highly adaptable to various lifestyles.',
            'Excellent companions for children.',
            'Natural performers in obedience trials.'
        ],
        cons: [
            'Highly prone to heart issues (MVD).',
            'Suffer from severe separation anxiety.',
            'Require regular grooming of their long ears.',
            'Low tolerance for being left alone.'
        ]
    },
    {
        id: 'saint-bernard',
        name: 'Saint Bernard',
        image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=800',
        lifespan: '8–10 years',
        facts: [
            'Famous for mountain rescues in the Swiss Alps.',
            'One of the heaviest and largest dog breeds.',
            'Known for the iconic (though mythical) brandy cask.',
            'Very patient and "nanny-like" with children.'
        ],
        abilities: [
            'Exceptional scent tracking in snow.',
            'Great endurance for pulling heavy loads.',
            'Natural protectors and guardians.',
            'Calm and comforting therapy presence.'
        ],
        cons: [
            'Massive amount of drool and shedding.',
            'Intolerant of high heat and humidity.',
            'Short lifespan and high medical costs.',
            'Require a lot of space and large-scale gear.'
        ]
    },
    {
        id: 'shiba-inu',
        name: 'Shiba Inu',
        image: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&q=80&w=800',
        lifespan: '13–16 years',
        facts: [
            'Ancient breed from Japan with fox-like features.',
            'Known for the "Shiba Scream" when upset.',
            'Highly independent and cat-like in personality.',
            'Extremely clean and easy to house-train.'
        ],
        abilities: [
            'Excellent hunters in rugged terrain.',
            'Incredible agility and quick reflexes.',
            'Vigilant and bold watchdogs.',
            'High level of focus and cleverness.'
        ],
        cons: [
            'Notoriously stubborn and hard to train.',
            'High prey drive (not safe off-leash).',
            'Can be wary and aloof with strangers.',
            'Heavy shedders (twice-yearly blow-outs).'
        ]
    },
    {
        id: 'pug',
        name: 'Pug',
        image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=800',
        lifespan: '12–15 years',
        facts: [
            'Ancient companion breed from China.',
            'Known for their wrinkled face and curled tail.',
            'Affectionately called "Multum in Parvo" (much in little).',
            'Thrive on human companionship and love to nap.'
        ],
        abilities: [
            'Exceptional emotional support companions.',
            'Naturally social and friendly with everyone.',
            'Highly adaptable to indoor living.',
            'Great at entertaining with "clown-like" behavior.'
        ],
        cons: [
            'Prone to breathing and respiratory issues.',
            'Sensitive to extreme heat and humidity.',
            'Can be prone to obesity (very food-motivated).',
            'Heavy shedders despite their short coat.'
        ]
    },
    {
        id: 'chihuahua',
        name: 'Chihuahua',
        image: 'https://images.unsplash.com/photo-1512140417-3770e28f3223?auto=format&fit=crop&q=80&w=800',
        lifespan: '14–16+ years',
        facts: [
            'Named after the Mexican state of Chihuahua.',
            'One of the smallest and oldest dog breeds.',
            'Possess a "big dog" personality and attitude.',
            'Often form an intense bond with one person.'
        ],
        abilities: [
            'Incredibly alert and vocal watchdogs.',
            'Extremely loyal and devoted companions.',
            'Highly intelligent and capable of learning tricks.',
            'Perfect travel companions due to size.'
        ],
        cons: [
            'Can be snappy if not properly socialized.',
            'Fragile due to their tiny size.',
            'Prone to dental and heart issues.',
            'Can be difficult to house-train.'
        ]
    },
    {
        id: 'pomeranian',
        name: 'Pomeranian',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=800',
        lifespan: '12–16 years',
        facts: [
            'Descended from large sled-pulling dogs.',
            'Known for their fluffy double coat and fox-like face.',
            'Named after the Pomerania region in Europe.',
            'Incredibly extroverted and lively personality.'
        ],
        abilities: [
            'Quick learners in obedience and trick training.',
            'Naturally bold and alert watchdogs.',
            'Highly social and affectionate with family.',
            'Very active and agile for their size.'
        ],
        cons: [
            'Requires frequent and extensive grooming.',
            'Prone to excessive barking.',
            'Fragile and not ideal for very young children.',
            'Can be prone to tracheal collapse.'
        ]
    },
    {
        id: 'dalmatian',
        name: 'Dalmatian',
        image: 'https://images.unsplash.com/photo-1534351450181-ea9f78427fe8?auto=format&fit=crop&q=80&w=800',
        lifespan: '11–13 years',
        facts: [
            'Famous as "coach dogs" for horse-drawn carriages.',
            'Born pure white; spots develop as they grow.',
            'Unique and eye-catching black or liver spots.',
            'Historically associated with firehouses.'
        ],
        abilities: [
            'Exceptional endurance and running stamina.',
            'Highly athletic and agile performers.',
            'Alert and watchful guardians.',
            'Natural companions for horses and vehicles.'
        ],
        cons: [
            'Extremely high energy requirements.',
            'High incidence of deafness in the breed.',
            'Shed heavily year-round.',
            'Need a lot of mental and physical work.'
        ]
    },
    {
        id: 'akita',
        name: 'Akita',
        image: 'https://images.unsplash.com/photo-1591160674255-410bb4842d4d?auto=format&fit=crop&q=80&w=800',
        lifespan: '10–14 years',
        facts: [
            'Ancient breed from Japan, symbol of health and loyalty.',
            'Known for the legendary Hachikō, the most loyal dog.',
            'Have a distinctive plush, curled-over tail.',
            'Quiet, dignified, and courageous nature.'
        ],
        abilities: [
            'Fierce and devoted family guardians.',
            'Strong search and rescue capabilities.',
            'Adept at tracking and scent work.',
            'Exceptional endurance in cold climates.'
        ],
        cons: [
            'Can be aggressive toward other dogs.',
            'Independent and sometimes stubborn to train.',
            'Wary of strangers (requires early socialization).',
            'Heavy seasonal shedders.'
        ]
    },
    {
        id: 'chow-chow',
        name: 'Chow Chow',
        image: 'https://images.unsplash.com/photo-1554692990-d92033c1f1ee?auto=format&fit=crop&q=80&w=800',
        lifespan: '8–12 years',
        facts: [
            'Famous for their unique blue-black tongue.',
            'Known for their "lion-like" mane of fur.',
            'One of the world\'s oldest dog breeds.',
            'Highly independent and cat-like in temperament.'
        ],
        abilities: [
            'Vigilant and naturally protective watchdogs.',
            'Extremely clean and easy to house-train.',
            'Calm and dignified indoor presence.',
            'Strong sense of loyalty to one person.'
        ],
        cons: [
            'Can be aloof and suspicious of strangers.',
            'Prone to overheating in warm weather.',
            'Requires significant and regular grooming.',
            'Not recommended for first-time owners.'
        ]
    },
    {
        id: 'shar-pei',
        name: 'Shar-Pei',
        image: 'https://images.unsplash.com/photo-1593134257782-e89567b7684d?auto=format&fit=crop&q=80&w=800',
        lifespan: '8–12 years',
        facts: [
            'Instantly recognizable by their deep skin wrinkles.',
            'Possess a unique blue-black tongue like the Chow.',
            'Name translates to "Sand Skin" due to coat texture.',
            'Devoted and calm companions with family.'
        ],
        abilities: [
            'Excellent and naturally suspicious watchdogs.',
            'Highly intelligent and discerning.',
            'Require moderate exercise, great for homes.',
            'Strong and independent problem-solvers.'
        ],
        cons: [
            'Prone to skin infections in their wrinkles.',
            'Can be very stubborn and strong-willed.',
            'Prone to eye issues like entropion.',
            'Need early and persistent socialization.'
        ]
    },
    {
        id: 'malamute',
        name: 'Alaskan Malamute',
        image: 'https://images.unsplash.com/photo-1491604612772-6853927639ef?auto=format&fit=crop&q=80&w=800',
        lifespan: '10–14 years',
        facts: [
            'Built for power and endurance as Arctic sled dogs.',
            'The official state dog of Alaska.',
            'Friendly, outgoing, and love all people.',
            'Have a very thick, waterproof double coat.'
        ],
        abilities: [
            'Expert at pulling heavy weight over long distances.',
            'Superior endurance and strength.',
            'Excellent companions for cold-weather sports.',
            'Highly social and affectionate "pack" dogs.'
        ],
        cons: [
            'Extremely high physical and mental needs.',
            'Notorious "escape artists" and diggers.',
            'Shed massive amounts of fur seasonally.',
            'Strong prey drive and prone to roaming.'
        ]
    },
    {
        id: 'samoyed',
        name: 'Samoyed',
        image: 'https://images.unsplash.com/photo-1529429617329-8a79c052972d?auto=format&fit=crop&q=80&w=800',
        lifespan: '12–14 years',
        facts: [
            'Known for the "Sammy Smile" due to upturned mouth.',
            'Arctic breed with a thick, pure white double coat.',
            'Bred to herd reindeer and pull heavy sleds.',
            'Extremely social and friendly with humans.'
        ],
        abilities: [
            'Superior endurance and strength in cold weather.',
            'Highly social and affectionate "pack" dogs.',
            'Naturally clean and low-odor for a dog.',
            'Excellent family and therapy companions.'
        ],
        cons: [
            'Intense grooming requirements (daily brushing).',
            'Shed heavily and leave fur everywhere.',
            'Can be vocal and bark/vocalize a lot.',
            'Prone to separation anxiety if left alone.'
        ]
    },
    {
        id: 'basset-hound',
        name: 'Basset Hound',
        image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800',
        lifespan: '10–13 years',
        facts: [
            'Possess a sense of smell second only to Bloodhounds.',
            'Instantly recognizable for long ears and sad eyes.',
            'Low-slung body helps them stay close to scents.',
            'Known for being laid-back and easy-going.'
        ],
        abilities: [
            'World-class scent-tracking and trailing.',
            'Extremely patient and good with children.',
            'Naturally calm and loyal companions.',
            'Excellent at working in packs.'
        ],
        cons: [
            'Can be very stubborn and hard to train.',
            'Prone to obesity and back/joint problems.',
            'Known for loud baying and howling.',
            'Ears require constant cleaning to avoid infection.'
        ]
    },
    {
        id: 'bull-terrier',
        name: 'Bull Terrier',
        image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?auto=format&fit=crop&q=80&w=800',
        lifespan: '12–13 years',
        facts: [
            'Unique "egg-shaped" head and triangular eyes.',
            'Known as the "White Cavalier" for their courage.',
            'Incredibly energetic, playful, and funny.',
            'Bred originally as a fighting dog, now a companion.'
        ],
        abilities: [
            'Exceptional strength and athletic agility.',
            'Highly focused and determined in tasks.',
            'Natural entertainers and very affectionate.',
            'Vigilant and protective of their family.'
        ],
        cons: [
            'Can be very stubborn and strong-willed.',
            'Prone to specific health issues like deafness.',
            'Require a lot of exercise and mental work.',
            'May be aggressive toward other pets.'
        ]
    },
    {
        id: 'greyhound',
        name: 'Greyhound',
        image: 'https://images.unsplash.com/photo-1541591419459-0028a496b864?auto=format&fit=crop&q=80&w=800',
        lifespan: '10–14 years',
        facts: [
            'The fastest dog breed, reaching 45 mph.',
            'One of the oldest dog breeds in existence.',
            'Known as "45mph Couch Potatoes" for laziness.',
            'Incredibly lean build with very low body fat.'
        ],
        abilities: [
            'Unmatched sprinting speed and acceleration.',
            'Keen eyesight for spotting movement.',
            'Very gentle and quiet indoor presence.',
            'Exceptional athletic elegance.'
        ],
        cons: [
            'Extremely high prey drive (not safe off-leash).',
            'Very sensitive to cold and heat.',
            'Skin is delicate and prone to injury.',
            'Can be aloof and shy with strangers.'
        ]
    }
];

export default dogBreeds;
