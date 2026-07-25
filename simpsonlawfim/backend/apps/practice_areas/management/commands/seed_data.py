import json
from django.core.management.base import BaseCommand
from apps.practice_areas.models import PracticeArea
from apps.team.models import TeamMember
from apps.testimonials.models import Testimonial
from apps.offices.models import Office


PRACTICE_AREAS = [
    {
        "slug": "personal-injury",
        "title": "Personal Injury",
        "docket_number": 1,
        "headline": "Depend on Our Attorneys to Fight for Fair Compensation",
        "summary": "Have you been injured due to the carelessness of others? Turn to the attorneys at Simpson Law Firm to champion your case. We have a thorough knowledge of all legal aspects related to injury cases. With over 25 years of experience, it won't be an exaggeration to say that we are your best chance in the area.",
        "body": "If you live in Searcy, AR and want to file a case for personal injury, call the lawyers at Simpson Law Firm today. Let us put our years of combined experience with the state and federal legal system to work for your case.",
        "extra": "",
        "services_title": "Our Personal Injury Services",
        "bullet_points": [
            "Auto accidents",
            "Tractor-trailer accidents",
            "Medical malpractice issues",
            "Insurance claims for accidents",
        ],
        "stamp_label": "Fee structure",
        "stamp_body": "We offer a contingency basis for personal injury representations. That means that we receive the fee only if we win the case for you. Contact us to learn more!",
        "order": 1,
    },
    {
        "slug": "wrongful-death",
        "title": "Wrongful Death",
        "docket_number": 2,
        "headline": "Let Our Compassionate Attorneys Handle Your Case",
        "summary": "We empathize with the pain and suffering a person endures when they lose their loved ones to an avoidable tragedy. However, we advise you to stay strong and seek the help of dependable legal counsel to make sure the one at fault is held accountable.",
        "body": "The compassionate attorneys at Simpson Law Firm will make sure you get the justice you deserve. Whether it is a medical malpractice issue or a vehicle accident, our attorneys will be there with you at all times.",
        "extra": "If you have unsettled pension claims of your departed family member or life insurance claims, we can help out with that too. Count on our more than two decades of experience; call us to schedule your appointment.",
        "services_title": "Our Wrongful Death and End-of-Life Legal Services",
        "bullet_points": [
            "Pension claims",
            "Life insurance claims",
            "Social security benefits",
            "Family distribution matters",
            "Car and truck accidents",
            "Estate matters",
        ],
        "stamp_label": "How we help",
        "stamp_body": "We handle the legal and financial fallout so your family isn't fighting insurers during an already difficult time.",
        "order": 2,
    },
    {
        "slug": "vehicle-accidents",
        "title": "Tractor-Trailer/Car Accident",
        "docket_number": 3,
        "headline": "Comprehensive Legal Assistance for Vehicle Accidents",
        "summary": "The slightest misdirection of an 80,000-pound tractor-trailer can lead to devastating consequences such as major bodily injuries or even death! If someone you love has been injured or killed due to a tractor-trailer-related accident, turn to us for the legal help you need to get the compensation you deserve.",
        "body": "The diligent attorneys at Simpson Law Firm have over 25 years of experience in handling such tractor-trailer-related accidents. Online appointments are possible. Get in touch with our office today!",
        "extra": "Whether you have been in a car accident or a truck accident, the brilliant attorneys at Simpson Law Firm are always willing to tirelessly fight for your rights. Even though we can't recompense you for the mental trauma you have suffered due to an accident, we will fight to help you get the monetary compensation you deserve. Get the quality legal assistance you need. Contact us today!",
        "services_title": "Exceptional Legal Representation for Any Accident",
        "bullet_points": [
            "Car & truck accidents",
            "Tractor-trailer collisions",
            "Medical bill & lost-wage recovery",
            "Insurance negotiation",
        ],
        "stamp_label": "Fee structure",
        "stamp_body": "Contingency basis available — you don't pay unless we win your case.",
        "order": 3,
    },
    {
        "slug": "criminal-law",
        "title": "Criminal Law",
        "docket_number": 4,
        "headline": "Rely on Our Skillful Advocate to Argue for Your Defense",
        "summary": "Having an experienced and competent criminal attorney by your side when you are facing a criminal case can mean the difference between a prison sentence and the charges being reduced or dismissed.",
        "body": "The dedicated and aggressive criminal defense attorneys at Simpson Law Firm will ensure that your side of the case is presented effectively in court. Call us to schedule your appointment today!",
        "extra": "Our experienced criminal lawyers will make sure your side of the story is heard. Contact us today.",
        "services_title": "Aggressive Representation For Criminal Cases",
        "bullet_points": [
            "Drug charges",
            "Traffic crimes",
            "Assault charges",
            "DUIs",
            "Theft charges",
            "Felonies",
            "Misdemeanors",
        ],
        "stamp_label": "First contact",
        "stamp_body": "Call as soon as you're able — early representation matters most in the first hours after an arrest.",
        "order": 4,
    },
    {
        "slug": "litigation",
        "title": "Litigation",
        "docket_number": 5,
        "headline": "We Will Fight for Your Rights in the Courtroom",
        "summary": "Laws are formulated to protect your rights. Some companies and big corporations, however, may take advantage of legal loopholes for their benefit, depriving you of what you rightly deserve. If you are facing such a situation, turn to Simpson Law Firm. Our diligent, responsible attorneys are there to fight for your rights.",
        "body": "Whether you need assistance with a civil litigation case or you need help with settling your business disputes, turn to us. We have over two decades of experience. We can also help you with employment-related issues such as workplace discrimination, sexual harassment, occupational safety, and more. Contact Simpson Law Firm today!",
        "extra": "",
        "services_title": "Legal Assistance in a Wide Range of Civil Matters",
        "bullet_points": [
            "Business law",
            "Contracts",
            "Breaches of contract",
            "Collection actions",
            "Property tax appeals",
            "Foreclosures",
            "Landlord rights",
            "Real estate litigations",
            "Boundary disputes",
            "Consumer rights and frauds",
            "Corporate formulations",
        ],
        "stamp_label": "Approach",
        "stamp_body": "We aim to resolve disputes efficiently, but we're prepared to litigate fully when that's what a case requires.",
        "order": 5,
    },
    {
        "slug": "divorce-custody",
        "title": "Divorce/Custody",
        "docket_number": 6,
        "headline": "Aggressive Representation in Family Law",
        "summary": "We understand that it can be stressful to deal with legal issues related to divorce and child custody. You may feel tempted to forge ahead and make decisions without considering the full implications of those decisions.",
        "body": "At these times, it is important to seek the assistance of a skillful and experienced family law attorney who can help you resolve your family law issue in a way that meets the needs of all concerned. The compassionate yet experienced attorneys at Simpson Law Firm will help you resolve your family legal matter issue effectively. Call today to schedule your appointment.",
        "extra": "In many situations, it is possible for you to avoid the pain of going to court with these issues. Effective mediation can help all parties reach a mutually favorable decision, and our lawyers can help out with that. However, if you are unable to resolve matters through mediation, the experienced lawyers at Simpson Law Firm are always prepared to represent your interests in court.",
        "services_title": "Helping Arkansas Families Work Through Their Issues",
        "bullet_points": [
            "Divorce & separation",
            "Child custody & visitation",
            "Support arrangements",
            "Modifications",
        ],
        "stamp_label": "What to expect",
        "stamp_body": "You'll always work directly with your attorney — not be routed between staff during a sensitive case.",
        "order": 6,
    },
]

TEAM_MEMBERS = [
    {
        "slug": "james-simpson",
        "name": "James A. Simpson, Jr.",
        "role": "Attorney — General, Civil & Criminal Practice",
        "bio": "Practicing general, civil, and criminal law since 1995. Born and raised in Searcy, and still fighting for the same community he grew up in.",
        "initials": "JS",
        "avatar_color": "brass-light",
        "order": 1,
    },
    {
        "slug": "clay-simpson",
        "name": "Clay Eliot Simpson",
        "role": "Attorney — Criminal & Insurance Litigation",
        "bio": "Former Deputy Prosecuting Attorney for the Sixth Judicial District and former Chief Counsel for the Arkansas Insurance Department's Criminal Investigative Division.",
        "initials": "CS",
        "avatar_color": "moss",
        "order": 2,
    },
]

TESTIMONIALS = [
    {
        "quote": "Friendly staff, fair prices, and they were always prompt returning my calls. Exactly what you want in a lawyer.",
        "attribution": "Local Reviewer",
        "rating": 5,
    },
    {
        "quote": "After my accident I had no idea where to start. They dealt with the insurance company so I didn't have to.",
        "attribution": "Personal Injury Client",
        "rating": 5,
    },
    {
        "quote": "Straightforward through a hard custody case. I knew what was happening at every step, not just at the end.",
        "attribution": "Family Law Client",
        "rating": 5,
    },
]

OFFICES = [
    {
        "name": "Simpson & Simpson Attorney at Law",
        "address_line1": "200 N Spring St",
        "city": "Searcy",
        "state": "AR",
        "zipcode": "72143",
        "phone": "(501) 389-9770",
        "hours": {
            "mon_fri": "8:30 am - 5:00 pm",
            "sat": "Closed",
            "sun": "Closed",
        },
    },
]


class Command(BaseCommand):
    help = "Seed the database with initial content"

    def handle(self, *args, **options):
        self.stdout.write("Seeding practice areas...")
        for data in PRACTICE_AREAS:
            obj, created = PracticeArea.objects.update_or_create(
                slug=data["slug"], defaults=data
            )
            self.stdout.write(f"  {'Created' if created else 'Updated'}: {obj.title}")

        self.stdout.write("Seeding team members...")
        for data in TEAM_MEMBERS:
            obj, created = TeamMember.objects.update_or_create(
                slug=data["slug"], defaults=data
            )
            self.stdout.write(f"  {'Created' if created else 'Updated'}: {obj.name}")

        self.stdout.write("Seeding testimonials...")
        for data in TESTIMONIALS:
            obj, created = Testimonial.objects.update_or_create(
                attribution=data["attribution"], defaults=data
            )
            self.stdout.write(f"  {'Created' if created else 'Updated'}: {obj.attribution}")

        self.stdout.write("Seeding offices...")
        for data in OFFICES:
            obj, created = Office.objects.update_or_create(
                name=data["name"], defaults=data
            )
            self.stdout.write(f"  {'Created' if created else 'Updated'}: {obj.name}")

        self.stdout.write(self.style.SUCCESS("Done seeding!"))
