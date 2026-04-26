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
    }
];

export default dogBreeds;
