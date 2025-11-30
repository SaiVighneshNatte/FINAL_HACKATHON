import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface ContentReaderProps {
  onBack: () => void;
  articleId?: string;
}

const constitutionContent = {
  "fundamental-rights": {
    title: "Fundamental Rights",
    subtitle: "Articles 12-35 - The Foundation of Democracy",
    icon: "⚖️",
    color: "bg-[#138808]",
    readTime: "25 min read",
    sections: [
      {
        title: "Article 12 - Definition",
        content: `In this part, unless the context otherwise requires, "the State" includes the Government and Parliament of India and the Government and the Legislature of each of the States and all local or other authorities within the territory of India or under the control of the Government of India.

Key Elements:
• Defines what constitutes "State" for fundamental rights
• Includes Central and State governments
• Covers Parliament and State legislatures
• Includes local authorities and statutory bodies
• Essential for understanding scope of fundamental rights

Judicial Interpretation:
The Supreme Court has expanded this definition to include corporations substantially controlled by the government, making fundamental rights applicable against a wider range of entities.`
      },
      {
        title: "Article 13 - Laws Inconsistent with Fundamental Rights",
        content: `All laws in force in the territory of India immediately before the commencement of this Constitution, in so far as they are inconsistent with the provisions of this Part, shall, to the extent of such inconsistency, be void.

The State shall not make any law which takes away or abridges the rights conferred by this Part and any law made in contravention of this clause shall, to the extent of the contravention, be void.

Doctrine of Eclipse:
• Pre-constitutional laws inconsistent with fundamental rights become void
• State cannot make laws violating fundamental rights
• Such laws are void ab initio (from the beginning)
• Courts have power of judicial review

Historical Significance:
This article established the principle of constitutional supremacy and judicial review in India, making the Constitution the supreme law of the land.`
      },
      {
        title: "Article 14 - Right to Equality",
        content: `The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.

Two Concepts:
• Equality before law (British concept)
• Equal protection of laws (American concept)

Equality Before Law means:
• No person is above the law
• Equal subjection to ordinary law
• Absence of special privileges

Equal Protection of Laws means:
• Equal treatment in equal circumstances
• Similar application of laws
• Reasonable classification is permitted

Reasonable Classification:
Must satisfy two tests:
• Classification must be based on intelligible differentia
• Differentia must have rational relation to object sought to be achieved

Landmark Cases:
• Maneka Gandhi v. Union of India (1978)
• E.P. Royappa v. State of Tamil Nadu (1974)`
      },
      {
        title: "Article 15 - Prohibition of Discrimination",
        content: `(1) The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them.

(2) No citizen shall, on grounds only of religion, race, caste, sex, place of birth or any of them, be subject to any disability, liability, restriction or condition with regard to:
(a) access to shops, public restaurants, hotels and places of public entertainment; or
(b) the use of wells, tanks, bathing ghats, roads and places of public resort maintained wholly or partly out of State funds or dedicated to the use of the general public.

Prohibited Grounds:
• Religion
• Race  
• Caste
• Sex
• Place of birth

Exceptions (Clause 3 & 4):
• Special provisions for women and children
• Special provisions for socially and educationally backward classes
• Special provisions for Scheduled Castes and Scheduled Tribes

Recent Amendments:
• Article 15(5) - Added by 93rd Amendment (2005)
• Allows reservations in private educational institutions`
      },
      {
        title: "Article 16 - Equality of Opportunity in Public Employment",
        content: `(1) There shall be equality of opportunity for all citizens in matters relating to employment or appointment to any office under the State.

(2) No citizen shall, on grounds only of religion, race, caste, sex, descent, place of birth, residence or any of them, be ineligible for, or discriminated against in respect of, any employment or office under the State.

Key Features:
• Merit-based selection
• No discrimination in government jobs
• Equal opportunity principle

Exceptions and Reservations:
• Article 16(3) - Parliament can prescribe residence requirements
• Article 16(4) - Reservations for backward classes
• Article 16(4A) - Reservations in promotions (77th Amendment)
• Article 16(4B) - Carry forward of unfilled reserved vacancies (81st Amendment)
• Article 16(5) - Exemption for religious institutions

Constitutional Amendments:
• 77th Amendment (1995) - Added clause 4A
• 81st Amendment (2000) - Added clause 4B
• 85th Amendment (2001) - Added clause 5

Indra Sawhney Case (1992):
• 50% ceiling on reservations
• Exclusion of creamy layer
• No reservation in promotions (later overruled)`
      },
      {
        title: "Article 17 - Abolition of Untouchability",
        content: `"Untouchability" is abolished and its practice in any form is forbidden. The enforcement of any disability arising out of "Untouchability" shall be an offence punishable in accordance with law.

Historic Significance:
• Abolishes the evil practice of untouchability
• Makes it a punishable offense
• Reflects Gandhian philosophy
• Part of social revolution through Constitution

Implementation:
• Protection of Civil Rights Act, 1955
• Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989
• Various welfare schemes and affirmative action programs

Social Impact:
• Legal framework to eliminate caste-based discrimination
• Foundation for social justice measures
• Enables dignity and equal treatment for all citizens

Judicial Interpretation:
Courts have taken an expansive view, treating any form of caste-based discrimination as violation of Article 17.`
      },
      {
        title: "Article 18 - Abolition of Titles",
        content: `(1) No title, not being a military or academic distinction, shall be conferred by the State.

(2) No citizen of India shall accept any title from any foreign State.

(3) No person who is not a citizen of India shall, while he holds any office of profit or trust under the State, accept without the consent of the President any title from any foreign State.

(4) No person holding any office of profit or trust under the State shall, without the consent of the President, accept any present, emolument, or office of any kind from or under any foreign State.

Permitted Titles:
• Military distinctions (Param Vir Chakra, etc.)
• Academic distinctions (Ph.D., etc.)

Prohibited:
• Hereditary titles
• Titles creating artificial distinctions

Exception:
• Awards like Bharat Ratna, Padma awards are not considered "titles"
• They are national honors, not hereditary distinctions

Philosophy:
• Promotes equality and democratic values
• Prevents creation of privileged classes
• Reflects rejection of colonial title system`
      },
      {
        title: "Article 19 - Protection of Certain Rights regarding Freedom of Speech",
        content: `(1) All citizens shall have the right to:
(a) freedom of speech and expression;
(b) assemble peaceably and without arms;
(c) form associations or unions;
(d) move freely throughout the territory of India;
(e) reside and settle in any part of the territory of India; and
(g) practise any profession, or to carry on any occupation, trade or business.

Six Freedoms:
1. Freedom of Speech and Expression
2. Freedom of Assembly
3. Freedom of Association
4. Freedom of Movement
5. Freedom of Residence
6. Freedom of Profession

Reasonable Restrictions (Article 19(2)):
• Security of State
• Friendly relations with foreign states
• Public order
• Decency or morality
• Contempt of court
• Defamation
• Incitement to offence

Historical Note:
• Originally had 7 freedoms including right to property
• Right to property removed by 44th Amendment (1978)
• Now Article 300A provides limited protection to property

Landmark Cases:
• Romesh Thappar v. State of Madras (1950)
• Bennett Coleman v. Union of India (1972)
• Maneka Gandhi v. Union of India (1978)`
      },
      {
        title: "Article 20 - Protection in Respect of Conviction for Offences",
        content: `(1) No person shall be convicted of any offence except for violation of a law in force at the time of the commission of the act charged as an offence, nor be subjected to a penalty greater than that which might have been inflicted under the law in force at the time of the commission of the offence.

(2) No person shall be prosecuted and punished for the same offence more than once.

(3) No person accused of any offence shall be compelled to be a witness against himself.

Three Protections:
1. Protection against Ex-post facto laws
2. Protection against Double Jeopardy  
3. Protection against Self-incrimination

Ex-post facto Law:
• No retrospective criminal law
• Penalty cannot exceed what was prescribed when offense was committed
• Based on principle "nullum crimen sine lege"

Double Jeopardy:
• Same as "autrefois acquit" and "autrefois convict"
• Protection against multiple prosecutions
• Must be by court of competent jurisdiction

Self-incrimination:
• Right to remain silent
• Cannot be forced to give evidence against oneself
• Includes confessions, documents, physical evidence

Exceptions:
• Compulsory production of documents
• Medical examination
• Voice samples, fingerprints
• Test identification parade`
      },
      {
        title: "Article 21 - Protection of Life and Personal Liberty",
        content: `No person shall be deprived of his life or personal liberty except according to procedure established by law.

Original Interpretation (ADM Jabalpur Case):
• Narrow interpretation focusing only on procedure
• Even unjust law if procedurally correct was sufficient

Revolutionary Change (Maneka Gandhi Case 1978):
• Procedure must be just, fair and reasonable
• Merged substantive and procedural due process
• Made Article 21 the heart of fundamental rights

Expanded Scope - Right to Life includes:
• Right to live with dignity
• Right to livelihood
• Right to health
• Right to education (Article 21A added by 86th Amendment)
• Right to clean environment
• Right to privacy (K.S. Puttaswamy case 2017)
• Right to sleep
• Right to reputation

Personal Liberty includes:
• Freedom from physical restraint
• Right to move freely
• Right to privacy
• Right against solitary confinement
• Right to legal aid
• Right to speedy trial

Landmark Cases:
• Maneka Gandhi v. Union of India (1978)
• Francis Coralie v. Union Territory of Delhi (1981)
• Olga Tellis v. Bombay Municipal Corporation (1985)
• Vishaka v. State of Rajasthan (1997)
• K.S. Puttaswamy v. Union of India (2017)`
      },
      {
        title: "Article 21A - Right to Education",
        content: `The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may, by law, determine.

Added by 86th Constitutional Amendment (2002):
• Made education a fundamental right
• Age group: 6-14 years
• Free and compulsory education

Implementation:
• Right to Education Act, 2009
• 25% reservation in private schools
• Prohibition of capitation fees
• No detention policy (later modified)

Key Features of RTE Act:
• Neighborhood school concept
• Specified teacher-student ratio
• Infrastructure requirements
• Prohibition of screening procedures
• Recognition conditions for schools

Corresponding Duty:
• Article 51A(k) added duty of parents/guardians
• To provide education to children aged 6-14

Challenges:
• Quality of education
• Infrastructure deficits
• Teacher training
• Learning outcomes

Supreme Court Observations:
• Education is a human right
• Quality education is essential
• State's positive obligation`
      },
      {
        title: "Article 22 - Protection Against Arrest and Detention",
        content: `(1) No person who is arrested shall be detained in custody without being informed, as soon as may be, of the grounds for such arrest nor shall he be denied the right to consult, and to be defended by, a legal practitioner of his choice.

(2) Every person who is arrested and detained in custody shall be produced before the nearest magistrate within a period of twenty-four hours of such arrest excluding the time necessary for the journey from the place of arrest to the court of the magistrate and no such person shall be detained in custody beyond the said period without the authority of a magistrate.

Rights of Arrested Person:
• Right to know grounds of arrest
• Right to legal representation
• Right to be produced before magistrate within 24 hours
• Protection against arbitrary detention

Exceptions (Preventive Detention):
• Enemy aliens
• Persons detained under preventive detention laws
• Such persons not entitled to rights under clauses (1) and (2)

Preventive Detention Safeguards:
• Advisory Board review within 3 months
• Grounds to be communicated within 5-15 days
• Right to make representation
• Maximum period as prescribed by Parliament (currently 12 months)

Constitutional Provisions:
• Article 22(4) to (7) deal with preventive detention
• Parliament can make laws for preventive detention
• State legislatures can make laws for state security

Criticism:
• Potential for misuse
• Detention without trial
• Conflict with personal liberty
• Need for judicial oversight

Landmark Cases:
• AK Gopalan v. State of Madras (1950)
• Maneka Gandhi v. Union of India (1978)
• Kartar Singh v. State of Punjab (1994)`
      }
    ]
  },
  "fundamental-duties": {
    title: "Fundamental Duties",
    subtitle: "Article 51A - Citizens' Responsibilities",
    icon: "🤝",
    color: "bg-[#FF9933]",
    readTime: "12 min read",
    sections: [
      {
        title: "Article 51A - Fundamental Duties of Citizens",
        content: `It shall be the duty of every citizen of India—

(a) to abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem;

(b) to cherish and follow the noble ideals which inspired our national struggle for freedom;

(c) to uphold and protect the sovereignty, unity and integrity of India;

(d) to defend the country and render national service when called upon to do so;

(e) to promote harmony and the spirit of common brotherhood amongst all the people of India transcending religious, linguistic and regional or sectional diversities; to renounce practices derogatory to the dignity of women;

(f) to value and preserve the rich heritage of our composite culture;

(g) to protect and improve the natural environment including forests, lakes, rivers and wild life, and to have compassion for living creatures;

(h) to develop the scientific temper, humanism and the spirit of inquiry and reform;

(i) to safeguard public property and to abjure violence;

(j) to strive towards excellence in all spheres of individual and collective activity so that the nation constantly rises to higher levels of endeavour and achievement;

(k) who is a parent or guardian to provide opportunities for education to his child or, as the case may be, ward between the age of six and fourteen years.

Historical Background:
• Added by 42nd Amendment (1976)
• Inspired by Soviet Constitution
• Originally 10 duties, 11th added by 86th Amendment (2002)
• Recommended by Swaran Singh Committee

Nature of Duties:
• Moral and civic obligations
• Not legally enforceable
• Complement fundamental rights
• Guide for legislation and judicial decisions

Significance:
• Balance between rights and duties
• Promote patriotism and national integration
• Environmental protection
• Cultural preservation
• Scientific temperament`
      }
    ]
  },
  "directive-principles": {
    title: "Directive Principles of State Policy",
    subtitle: "Articles 36-51 - Guidelines for Governance",
    icon: "📋",
    color: "bg-[#000080]",
    readTime: "20 min read",
    sections: [
      {
        title: "Article 36 - Definition",
        content: `In this Part, unless the context otherwise requires, "the State" has the same meaning as in Part III.

Scope:
• Same definition as in Fundamental Rights
• Includes Union and State governments
• Covers all local authorities
• Applies to statutory bodies

Significance:
• Ensures consistency between Parts III and IV
• Wide applicability of directive principles
• Comprehensive coverage of state machinery`
      },
      {
        title: "Article 37 - Application of Principles",
        content: `The provisions contained in this Part shall not be enforceable by any court, but the principles therein laid down are nevertheless fundamental in the governance of the country and it shall be the duty of the State to apply these principles in making laws.

Key Features:
• Not justiciable (cannot be enforced in courts)
• Fundamental in governance
• Binding moral obligation on state
• Guidelines for making laws

Judicial Interpretation:
• Cannot be enforced directly
• Can be used to interpret constitutional provisions
• Test of validity for laws
• Guide for judicial decisions

Gandhian Philosophy:
• Welfare state concept
• Social and economic justice
• Upliftment of weaker sections`
      },
      {
        title: "Article 38 - State to Promote Welfare of People",
        content: `(1) The State shall strive to promote the welfare of the people by securing and protecting as effectively as it may a social order in which justice, social, economic and political, shall inform all the institutions of the national life.

(2) The State shall, in particular, strive to minimise the inequalities in income, and endeavour to eliminate inequalities in status, facilities and opportunities, not only amongst individuals but also amongst groups of people residing in different areas or engaged in different vocations.

Welfare State Concept:
• Social, economic, and political justice
• Minimize income inequalities
• Eliminate status differences
• Equal opportunities for all

Implementation:
• Progressive taxation
• Land reforms
• Employment schemes
• Social security measures
• Regional development programs

Added by 44th Amendment (1978):
• Clause (2) added to emphasize equality
• Focus on reducing regional disparities
• Occupational equity`
      },
      {
        title: "Article 39 - Certain Principles of Policy",
        content: `The State shall, in particular, direct its policy towards securing—

(a) that the citizens, men and women equally, have the right to an adequate means of livelihood;

(b) that the ownership and control of the material resources of the community are so distributed as best to subserve the common good;

(c) that the operation of the economic system does not result in the concentration of wealth and means of production to the common detriment;

(d) that there is equal pay for equal work for both men and women;

(e) that the health and strength of workers, men and women, and the tender age of children are not abused and that citizens are not forced by economic necessity to enter avocations unsuited to their age or strength;

(f) that children are given opportunities and facilities to develop in a healthy manner and in conditions of freedom and dignity and that childhood and youth are protected against exploitation and against moral and material abandonment.

Socialist Principles:
• Right to livelihood
• Equitable distribution of resources
• Prevention of concentration of wealth
• Equal pay for equal work
• Protection of workers and children

Clause (f) added by 42nd Amendment:
• Protection of children
• Healthy development
• Freedom and dignity
• Prevention of exploitation

Key Implementations:
• Minimum wages legislation
• Child labor prohibition
• Industrial safety laws
• Equal remuneration acts
• MGNREGA scheme`
      },
      {
        title: "Article 39A - Equal Justice and Free Legal Aid",
        content: `The State shall secure that the operation of the legal system promotes justice, on a basis of equal opportunity, and shall, in particular, provide free legal aid, by suitable legislation or schemes or in any other way, to ensure that opportunities for securing justice are not denied to any citizen by reason of economic or other disabilities.

Added by 42nd Amendment (1976):
• Access to justice for all
• Free legal aid for poor
• Equal opportunity in legal system
• Remove economic barriers

Implementation:
• Legal Services Authorities Act, 1987
• National Legal Services Authority (NALSA)
• State Legal Services Authorities
• District Legal Services Authorities
• Lok Adalats

Services Provided:
• Free legal representation
• Legal awareness programs
• Alternative dispute resolution
• Consultation and advice
• Document drafting assistance

Beneficiaries:
• Scheduled Castes/Tribes
• Women and children
• Disabled persons
• Industrial workers
• Poor and marginalized sections`
      },
      {
        title: "Article 40 - Organisation of Village Panchayats",
        content: `The State shall take steps to organise village panchayats and endow them with such powers and authority as may be necessary to enable them to function as units of self-government.

Gandhian Vision:
• Gram Swaraj (village self-rule)
• Decentralized governance
• Local self-government
• Democratic participation at grassroots

Implementation:
• 73rd Amendment (1992) - Panchayati Raj
• Three-tier system (Village, Block, District)
• Constitutional status to Panchayats
• Regular elections and reservations

Powers of Panchayats:
• Economic development
• Social justice
• Implementation of schemes
• Local planning
• Maintenance of civic amenities

Significance:
• Democracy at grassroots
• Rural development
• Women's participation
• Social empowerment`
      },
      {
        title: "Article 41 - Right to Work, Education and Public Assistance",
        content: `The State shall, within the limits of its economic capacity and development, make effective provision for securing the right to work, to education and to public assistance in cases of unemployment, old age, sickness and disablement, and in other cases of undeserved want.

Economic and Social Rights:
• Right to work
• Right to education  
• Right to public assistance
• Social security measures

Subject to Economic Capacity:
• Gradual implementation
• Progressive realization
• Based on available resources
• Developmental priorities

Implementation Measures:
• Employment generation schemes
• Educational programs
• Social security schemes
• Pension and insurance
• Healthcare facilities

Modern Relevance:
• MGNREGA for employment
• RTE Act for education
• Various pension schemes
• Healthcare missions
• Skill development programs`
      },
      {
        title: "Article 42 - Provision for Just and Humane Conditions of Work and Maternity Relief",
        content: `The State shall make provision for securing just and humane conditions of work and for maternity relief.

Workers' Welfare:
• Just working conditions
• Humane treatment
• Safe working environment
• Reasonable working hours
• Maternity benefits

Implementation:
• Factories Act, 1948
• Minimum Wages Act, 1948
• Maternity Benefit Act, 1961
• Industrial Disputes Act, 1947
• Employees' State Insurance Act, 1948

Maternity Relief:
• Paid maternity leave
• Medical care during pregnancy
• Protection from dismissal
• Nursing breaks
• Childcare facilities

Recent Developments:
• Maternity Benefit Amendment Act, 2017
• Extended maternity leave to 26 weeks
• Adoption and surrogacy provisions
• Creche facilities mandate`
      },
      {
        title: "Article 43 - Living Wage for Workers",
        content: `The State shall endeavour to secure, by suitable legislation or economic organisation or in any other way, to all workers, agricultural or industrial, work, a living wage, conditions of work ensuring a decent standard of life and full enjoyment of leisure and social and cultural opportunities and, in particular, the State shall endeavour to promote cottage industries on an individual or co-operative basis in rural areas.

Living Wage Concept:
• Wage sufficient for decent living
• Not just minimum wage
• Includes leisure and cultural activities
• Covers all workers

Components:
• Basic needs satisfaction
• Healthcare facilities
• Educational opportunities
• Recreation and leisure
• Social security

Cottage Industries:
• Rural employment
• Traditional skills preservation
• Decentralized development
• Women's empowerment
• Sustainable livelihoods

Implementation:
• Minimum wage legislation
• Skill development programs
• Rural employment schemes
• Handicrafts promotion
• Self-help group movement`
      },
      {
        title: "Article 43A - Participation of Workers in Management",
        content: `The State shall take steps, by suitable legislation or in any other way, to secure the participation of workers in the management of undertakings, establishments or other organisations engaged in any industry.

Industrial Democracy:
• Worker participation in management
• Democratic industrial relations
• Collective decision making
• Shared responsibility

Added by 42nd Amendment (1976):
• Socialist principle
• Worker empowerment
• Industrial harmony
• Productivity improvement

Forms of Participation:
• Works committees
• Joint management councils
• Worker directors on boards
• Collective bargaining
• Suggestion schemes

Benefits:
• Better industrial relations
• Increased productivity
• Job satisfaction
• Reduced conflicts
• Skill development

Implementation Challenges:
• Resistance from management
• Lack of worker education
• Traditional mindset
• Limited legal framework`
      },
      {
        title: "Article 44 - Uniform Civil Code",
        content: `The State shall endeavour to secure for the citizens a uniform civil code throughout the territory of India.

Objective:
• National integration
• Gender equality
• Secular governance
• Legal uniformity

Current Status:
• Personal laws based on religion
• Different laws for different communities
• Goa has uniform civil code
• Debate continues

Arguments For:
• Gender justice
• National unity
• Equality before law
• Simplification of laws

Arguments Against:
• Religious freedom
• Cultural diversity
• Minority rights
• Constitutional secularism

Judicial Observations:
• Several Supreme Court judgments
• Stressed need for uniform code
• Government reluctance
• Political sensitivity

Implementation Challenges:
• Religious sensitivities
• Political considerations
• Constitutional framework
• Social resistance`
      },
      {
        title: "Article 45 - Provision for Free and Compulsory Education for Children",
        content: `The State shall endeavour to provide, within a period of ten years from the commencement of this Constitution, free and compulsory education for all children until they complete the age of fourteen years.

Original Provision:
• Target: 10 years from 1950
• Free and compulsory education
• Up to age 14
• State's endeavour

Modified by 86th Amendment (2002):
• Article 21A added as fundamental right
• Article 45 changed to early childhood care
• Age group: below 6 years
• Shift in focus

Current Article 45:
"The State shall endeavour to provide early childhood care and education for all children until they complete the age of six years."

Significance:
• Foundation for learning
• Holistic development
• Preparation for formal education
• Nutrition and health care

Implementation:
• Integrated Child Development Services (ICDS)
• Anganwadi system
• Pre-school education
• Nutrition programs
• Health check-ups`
      },
      {
        title: "Article 46 - Promotion of Educational and Economic Interests of SCs, STs and Other Weaker Sections",
        content: `The State shall promote with special care the educational and economic interests of the weaker sections of the people, and, in particular, of the Scheduled Castes and the Scheduled Tribes, and shall protect them from social injustice and all forms of exploitation.

Social Justice:
• Special care for weaker sections
• Focus on SCs and STs
• Educational advancement
• Economic upliftment
• Protection from exploitation

Implementation Measures:
• Reservation in education and employment
• Scholarship schemes
• Special component plans
• Skill development programs
• Financial assistance

Constitutional Provisions:
• Article 15(4) - Special provisions
• Article 16(4) - Reservation in services
• Article 330-342 - Political representation
• Fifth and Sixth Schedules

Legislation:
• SC/ST (Prevention of Atrocities) Act
• Forest Rights Act
• Various welfare schemes
• Educational programs
• Economic development initiatives

Challenges:
• Implementation gaps
• Discrimination persists
• Economic disparities
• Educational backwardness
• Social attitudes`
      },
      {
        title: "Article 47 - Duty to Raise Nutrition and Standard of Living and Improve Public Health",
        content: `The State shall regard the raising of the level of nutrition and the standard of living of its people and the improvement of public health as among its primary duties and, in particular, the State shall endeavour to bring about prohibition of the consumption except for medicinal purposes of intoxicating drinks and of drugs which are injurious to health.

Public Health Priority:
• Nutrition improvement
• Standard of living
• Public health as primary duty
• Prohibition of harmful substances

Health Measures:
• Healthcare infrastructure
• Disease prevention programs
• Nutrition schemes
• Safe drinking water
• Sanitation facilities

Prohibition Aspect:
• Ban on intoxicating drinks
• Exception for medicinal use
• Injurious drugs prohibition
• Public health protection

Implementation:
• National Health Mission
• Mid-day meal scheme
• ICDS program
• Vaccination drives
• Health insurance schemes

Challenges:
• Inadequate healthcare infrastructure
• Malnutrition problems
• Alcohol and drug abuse
• Implementation of prohibition
• Resource constraints`
      },
      {
        title: "Article 48 - Organisation of Agriculture and Animal Husbandry",
        content: `The State shall endeavour to organise agriculture and animal husbandry on modern and scientific lines and shall, in particular, take steps for preserving and improving the breeds of cattle and prohibiting the slaughter of cows and calves and other milch and draught cattle.

Agricultural Development:
• Modern scientific methods
• Technology adoption
• Productivity improvement
• Sustainable practices

Animal Husbandry:
• Breed improvement
• Scientific animal rearing
• Veterinary services
• Livestock development

Cattle Protection:
• Prohibition of cow slaughter
• Protection of milch cattle
• Draught animals protection
• Cultural and religious sensitivity

Implementation:
• Agricultural research institutes
• Extension services
• Veterinary infrastructure
• Breeding programs
• Technology transfer

Green Revolution:
• High-yielding varieties
• Chemical fertilizers
• Irrigation development
• Mechanization
• Credit support

Challenges:
• Small landholdings
• Climate change impact
• Market access
• Technology adoption
• Sustainable development`
      },
      {
        title: "Article 48A - Protection and Improvement of Environment",
        content: `The State shall endeavour to protect and improve the environment and to safeguard the forests and wild life of the country.

Added by 42nd Amendment (1976):
• Environmental protection
• Forest conservation
• Wildlife preservation
• Ecological balance

Environmental Mandate:
• Pollution control
• Natural resource conservation
• Biodiversity protection
• Sustainable development

Implementation:
• Environment Protection Act, 1986
• Forest Conservation Act, 1980
• Wildlife Protection Act, 1972
• Pollution control boards
• Environmental impact assessment

Judicial Activism:
• Supreme Court environmental jurisprudence
• Public interest litigation
• Strict enforcement
• Compensatory afforestation
• Polluter pays principle

Climate Change:
• National action plan
• Renewable energy promotion
• Carbon emission reduction
• International commitments
• Sustainable development goals

Challenges:
• Development vs environment
• Industrial pollution
• Deforestation
• Urban air quality
• Water contamination`
      },
      {
        title: "Article 49 - Protection of Monuments and Objects of National Importance",
        content: `It shall be the obligation of the State to protect every monument or place or object of artistic or historic interest, declared by or under law made by Parliament, to be of national importance, from spoliation, disfigurement, destruction, removal, disposal or export, as the case may be.

Cultural Heritage:
• Monument protection
• Artistic heritage preservation
• Historic importance
• National treasure protection

Types of Protection:
• Spoliation prevention
• Disfigurement prohibition
• Destruction prevention
• Unauthorized removal/disposal
• Export restrictions

Implementation:
• Archaeological Survey of India (ASI)
• Ancient Monuments and Archaeological Sites Act
• Treasure Trove Act
• Antiquities and Art Treasures Act
• World Heritage Sites

Monuments Protected:
• Ancient monuments
• Archaeological sites
• Museums
• Art galleries
• Cultural centers

Challenges:
• Encroachment issues
• Maintenance problems
• Tourist pressure
• Urban development
• Resource constraints

International Cooperation:
• UNESCO World Heritage Sites
• Bilateral cultural agreements
• International conventions
• Technical cooperation
• Cultural exchanges`
      },
      {
        title: "Article 50 - Separation of Judiciary from Executive",
        content: `The State shall take steps to separate the judiciary from the executive in the public services of the State.

Constitutional Principle:
• Independence of judiciary
• Separation of powers
• Rule of law
• Administrative efficiency

Implementation:
• Separate judicial service
• Independent selection process
• Judicial training institutes
• Administrative separation
• Financial independence

Benefits:
• Impartial justice delivery
• Administrative efficiency
• Professional competence
• Judicial independence
• Public confidence

Current Status:
• Most states implemented separation
• Judicial service creation
• Training programs
• Career progression
• Performance evaluation

Challenges:
• Administrative resistance
• Resource requirements
• Training needs
• Coordination issues
• Implementation variations

Judicial Reforms:
• Judicial appointments
• Infrastructure development
• Technology adoption
• Case management
• Alternative dispute resolution`
      },
      {
        title: "Article 51 - Promotion of International Peace and Security",
        content: `The State shall endeavour to—

(a) promote international peace and security;

(b) maintain just and honourable relations between nations;

(c) foster respect for international law and treaty obligations in the dealings of organised peoples with one another; and

(d) encourage settlement of international disputes by arbitration.

Foreign Policy Principles:
• International peace promotion
• Honorable international relations
• Respect for international law
• Peaceful dispute resolution

Panchsheel Principles:
• Mutual respect for sovereignty
• Non-aggression
• Non-interference
• Equality and mutual benefit
• Peaceful coexistence

Implementation:
• Non-Aligned Movement leadership
• UN peacekeeping participation
• International treaty compliance
• Bilateral and multilateral relations
• Conflict mediation efforts

India's Approach:
• Dialogue and diplomacy
• Multilateralism
• International cooperation
• Trade and economic relations
• Cultural exchanges

Contemporary Relevance:
• Global challenges
• Climate change cooperation
• Counter-terrorism efforts
• Economic partnerships
• Regional stability

Achievements:
• Peaceful nuclear policy
• International dispute resolution
• Development cooperation
• Humanitarian assistance
• Cultural diplomacy`
      }
    ]
  },
  "union-government": {
    title: "Union Government",
    subtitle: "Articles 52-151 - Central Government Structure",
    icon: "🏛️",
    color: "bg-purple-600",
    readTime: "30 min read",
    sections: [
      {
        title: "The President - Articles 52-62",
        content: `Article 52: There shall be a President of India.

Article 53: The executive power of the Union shall be vested in the President and shall be exercised by him either directly or through officers subordinate to him in accordance with this Constitution.

Key Features:
• Head of State (not head of government)
• Executive power vested in President
• Exercises power through Council of Ministers
• Ceremonial and constitutional head

Election (Article 54):
• Elected by Electoral College
• Members of Parliament (both houses)
• Members of State Legislative Assemblies
• Proportional representation with single transferable vote

Qualifications (Article 58):
• Citizen of India
• Not less than 35 years of age
• Qualified to be elected as member of Lok Sabha
• Should not hold any office of profit

Powers:
• Executive powers
• Legislative powers
• Judicial powers
• Emergency powers
• Diplomatic powers

Term and Removal:
• 5-year term
• Re-eligible
• Impeachment for violation of Constitution
• Resolution by both houses with special majority`
      },
      {
        title: "Vice-President - Articles 63-71",
        content: `Article 63: There shall be a Vice-President of India.

Article 64: The Vice-President shall be ex officio Chairman of the Council of States and shall not hold any other office of profit.

Key Features:
• Second highest constitutional office
• Ex-officio Chairman of Rajya Sabha
• Acts as President when office is vacant
• Not a member of either house of Parliament

Election (Article 66):
• Elected by Electoral College
• Members of both houses of Parliament
• Proportional representation with single transferable vote
• Different from President's election (no state assemblies)

Qualifications:
• Citizen of India
• Not less than 35 years of age
• Qualified to be elected as member of Rajya Sabha
• Should not hold any office of profit

Functions:
• Presides over Rajya Sabha
• Casting vote in case of tie
• Acts as President in absence
• Administrative functions in Rajya Sabha

Term and Removal:
• 5-year term
• Can be removed by Rajya Sabha resolution
• Majority of members and agreed by Lok Sabha
• No impeachment process like President`
      },
      {
        title: "Council of Ministers - Articles 74-75",
        content: `Article 74: There shall be a Council of Ministers with the Prime Minister at the head to aid and advise the President who shall, in the exercise of his functions, act in accordance with such advice.

Article 75: The Prime Minister shall be appointed by the President and the other Ministers shall be appointed by the President on the advice of the Prime Minister.

Parliamentary System:
• Council of Ministers aids and advises President
• President bound by advice (44th Amendment)
• Prime Minister is head of Council
• Collective responsibility to Lok Sabha

Composition:
• Prime Minister
• Cabinet Ministers
• Ministers of State
• Deputy Ministers

Categories:
• Cabinet Ministers: Senior ministers, attend Cabinet meetings
• Ministers of State: Independent charge or assist Cabinet Ministers
• Deputy Ministers: Assist Ministers of State or Cabinet Ministers

Appointment:
• Prime Minister appointed by President
• Other ministers on PM's advice
• Usually from Parliament
• Can be from outside for 6 months

Qualifications:
• Member of Parliament (or become within 6 months)
• Same as for Parliament membership
• Political considerations important

Powers and Functions:
• Policy formulation
• Administrative coordination
• Legislative leadership
• Budget preparation
• International relations

Collective Responsibility:
• Entire Council responsible to Lok Sabha
• Unanimous in public
• No confidence motion affects all
• Resignation of PM leads to Council's resignation`
      },
      {
        title: "Parliament - Articles 79-122",
        content: `Article 79: There shall be a Parliament for the Union which shall consist of the President and two Houses to be known respectively as the Council of States and the House of the People.

Bicameral Legislature:
• Two houses: Lok Sabha and Rajya Sabha
• President is part of Parliament
• Different composition and powers
• Both houses necessary for legislation

Lok Sabha (House of the People):
• Directly elected by people
• Maximum 552 members (530 from states, 20 from UTs, 2 Anglo-Indians)
• 5-year term (can be dissolved earlier)
• Speaker and Deputy Speaker

Rajya Sabha (Council of States):
• Indirectly elected by State Legislative Assemblies
• Maximum 250 members (238 from states/UTs, 12 nominated)
• 6-year term (1/3 retire every 2 years)
• Chairman (Vice-President) and Deputy Chairman

Powers of Parliament:
• Legislative powers (Union, Concurrent, Residuary)
• Financial powers (budget, taxation)
• Executive oversight
• Judicial functions (impeachment)
• Constitutional amendment powers

Sessions:
• Budget Session (February-May)
• Monsoon Session (July-August)
• Winter Session (November-December)
• Gap between sessions not more than 6 months

Parliamentary Procedures:
• Question Hour
• Zero Hour
• Committee system
• Voting procedures
• Privileges and immunities`
      },
      {
        title: "Legislative Powers and Procedure - Articles 107-122",
        content: `Article 107: Save as otherwise provided in this Constitution, every Bill shall be deemed to be a Bill to amend this Constitution if it seeks to amend any of the provisions of this Constitution.

Types of Bills:
• Ordinary Bills (can originate in either house)
• Money Bills (only in Lok Sabha)
• Financial Bills (two categories)
• Constitutional Amendment Bills

Legislative Procedure:
1. Introduction
2. First Reading
3. Second Reading (general discussion, clause-by-clause)
4. Third Reading
5. Transmission to other house
6. Presidential assent

Money Bills (Article 110):
• Can originate only in Lok Sabha
• Rajya Sabha cannot reject or amend
• Can only make recommendations
• Must be returned within 14 days
• Certification by Speaker

Deadlock Resolution:
• Joint sitting for ordinary bills
• Called by President
• Majority of total members present
• No joint sitting for Money Bills or Constitutional Amendment Bills

Presidential Powers:
• Assent to bills
• Withhold assent
• Return for reconsideration (suspensive veto)
• Pocket veto (no time limit for assent)

Ordinance Making Power (Article 123):
• When Parliament not in session
• Immediate action required
• Same force as Act of Parliament
• Must be laid before Parliament within 6 weeks
• Ceases to operate if not approved`
      }
    ]
  },
  "state-government": {
    title: "State Government",
    subtitle: "Articles 152-237 - State Government Structure",
    icon: "🏢",
    color: "bg-blue-600",
    readTime: "25 min read",
    sections: [
      {
        title: "Governor - Articles 153-162",
        content: `Article 153: There shall be a Governor for each State.

Article 154: The executive power of the State shall be vested in the Governor and shall be exercised by him either directly or through officers subordinate to him in accordance with this Constitution.

Constitutional Position:
• Head of State (not government)
• Executive power vested in Governor
• Exercises power through Council of Ministers
• Nominated by President

Appointment:
• Appointed by President
• Holds office during President's pleasure  
• Usually 5-year term
• Can be transferred between states

Qualifications:
• Citizen of India
• Not less than 35 years of age
• Should not be member of Parliament or State Legislature
• Should not hold any office of profit

Powers and Functions:
• Executive powers (similar to President)
• Legislative powers (assent to bills)
• Financial powers (money bills)
• Judicial powers (pardoning power for state offenses)
• Emergency powers (President's rule recommendation)

Discretionary Powers:
• Appointment of Chief Minister (hung assembly)
• Dismissal of ministry (loss of confidence)
• Reservation of bills for President
• Seeking information from Chief Minister

Role in Coalition Governments:
• Inviting single largest party
• Giving opportunity to form government
• Floor test requirement
• Constitutional crisis management`
      },
      {
        title: "State Council of Ministers - Articles 163-164",
        content: `Article 163: There shall be a Council of Ministers with the Chief Minister at the head to aid and advise the Governor in the exercise of his functions, except in so far as he is by or under this Constitution required to exercise his functions or any of them in his discretion.

Article 164: The Chief Minister shall be appointed by the Governor and the other Ministers shall be appointed by the Governor on the advice of the Chief Minister.

Parliamentary System:
• Chief Minister heads Council of Ministers
• Council aids and advises Governor
• Collective responsibility to State Legislature
• Governor normally bound by advice

Composition:
• Chief Minister
• Cabinet Ministers  
• Ministers of State
• Deputy Ministers

Appointment:
• Chief Minister appointed by Governor
• Other Ministers on CM's advice
• Usually from State Legislature
• Can be from outside for 6 months

Size Limitation:
• 91st Amendment (2003) limits size
• Cannot exceed 15% of total strength of Legislative Assembly
• Minimum size is 12

Powers and Functions:
• State policy formulation
• Administrative control
• Legislative leadership
• Budget preparation
• Law and order maintenance

Collective Responsibility:
• Entire Council responsible to Assembly
• No confidence motion affects all
• Individual resignation affects individual only
• Loss of majority leads to resignation`
      },
      {
        title: "State Legislature - Articles 168-212",
        content: `Article 168: For every State there shall be a Legislature which shall consist of the Governor, and (a) in the case of the States of Bihar, Maharashtra, Karnataka and Uttar Pradesh, two Houses; (b) in the case of other States, one House.

Structure:
• Unicameral (most states) - Legislative Assembly only
• Bicameral (6 states) - Assembly + Council
• Governor is part of Legislature
• Different powers and composition

Legislative Assembly:
• Directly elected by people
• Maximum 500 members, minimum 60
• 5-year term (can be dissolved earlier)
• Speaker and Deputy Speaker

Legislative Council (where exists):
• Maximum 1/3 of Assembly strength
• Minimum 40 members
• 6-year term (1/3 retire every 2 years)
• Chairman and Deputy Chairman

Composition of Council:
• 1/3 elected by Assembly members
• 1/3 elected by local bodies
• 1/12 elected by graduates
• 1/12 elected by teachers
• 1/6 nominated by Governor

Powers:
• Legislative powers (state and concurrent list)
• Financial powers (state finances)
• Executive oversight
• Electoral functions
• Other miscellaneous powers

Sessions and Procedures:
• Similar to Parliament
• Question Hour, debates
• Committee system
• Privileges and immunities
• Parliamentary procedures followed`
      },
      {
        title: "Legislative Powers and Procedure - Articles 196-212",
        content: `Article 196: If any question arises whether a Bill is a Money Bill or not, the decision of the Speaker of the Legislative Assembly of the State concerned shall be final.

Types of Bills:
• Ordinary Bills
• Money Bills (state finances)
• Financial Bills

Legislative Procedure:
1. Introduction (first reading)
2. General discussion (second reading)
3. Clause-by-clause consideration
4. Third reading and passing
5. Transmission to other house (if bicameral)
6. Governor's assent

Money Bills in States:
• Can originate only in Assembly
• Council cannot reject or amend
• Can make recommendations within 14 days
• Assembly may accept or reject recommendations
• Speaker's certification final

Governor's Powers:
• Assent to bills
• Withhold assent
• Return for reconsideration
• Reserve for President's consideration

Reservation of Bills:
• Mandatory reservation (repugnant to Central law)
• Discretionary reservation (public interest)
• Bills affecting High Court judges
• Bills imposing restrictions on trade and commerce

Ordinance Power (Article 213):
• When Legislature not in session
• Governor satisfied of immediate action
• Same force as Act of Legislature
• Must be laid before Legislature
• Ceases if not approved within 6 weeks`
      },
      {
        title: "High Courts - Articles 214-231",
        content: `Article 214: There shall be a High Court for each State.

Article 215: Every High Court shall be a court of record and shall have all the powers of such a court including the power to punish for contempt of itself.

Constitutional Status:
• High Court for each state
• Court of record
• Constitutional court
• Supervisory jurisdiction over subordinate courts

Composition:
• Chief Justice and other judges
• Number determined by President
• Circuit judges and additional judges possible
• Acting Chief Justice provision

Appointment (Article 217):
• By President in consultation with:
  - Chief Justice of India
  - Governor of concerned state
  - Chief Justice of High Court (for other judges)

Qualifications:
• Citizen of India
• 10 years judicial experience in India, or
• 10 years practice as advocate in High Court

Term and Removal:
• Tenure until 62 years of age
• Removal by President on Parliament's address
• Same grounds as Supreme Court judges
• Can resign or be transferred

Jurisdiction:
• Original jurisdiction (writ petitions)
• Appellate jurisdiction (civil and criminal)
• Supervisory jurisdiction over subordinate courts
• Administrative control over district courts

Writ Jurisdiction (Article 226):
• Wider than Supreme Court under Article 32
• Can issue writs to any person/authority
• For fundamental rights and other purposes
• Territorial jurisdiction within state

Powers:
• Constitutional interpretation
• Administrative law
• Criminal appeals
• Civil appeals
• Contempt of court
• Rule-making powers`
      }
    ]
  },
  "judiciary": {
    title: "Judiciary",
    subtitle: "Articles 124-147 - Guardian of Constitution",
    icon: "⚖️",
    color: "bg-red-600",
    readTime: "18 min read",
    sections: [
      {
        title: "Supreme Court - Articles 124-147",
        content: `Article 124: There shall be a Supreme Court of India consisting of a Chief Justice of India and, until Parliament by law prescribes a larger number, of not more than seven other Judges.

Constitutional Position:
• Apex court of India
• Guardian of Constitution
• Federal court
• Court of record

Current Strength:
• 1 Chief Justice + 33 other judges (34 total)
• Originally 1 + 7 = 8 judges
• Increased by Parliament from time to time
• Latest increase in 2019

Appointment (Article 124):
• By President in consultation with CJI and other judges
• Collegium system (judicially evolved)
• 5-judge collegium for Supreme Court appointments
• 3-judge collegium for High Court appointments

Qualifications:
• Citizen of India
• High Court judge for 5+ years, or
• Advocate in High Court for 10+ years, or
• Distinguished jurist in President's opinion

Term and Removal:
• Tenure until 65 years of age
• Removal by impeachment
• Both houses of Parliament with special majority
• Grounds: proved misbehavior or incapacity

Jurisdiction and Powers:
• Original jurisdiction (disputes between governments)
• Writ jurisdiction (Article 32 - fundamental rights)
• Appellate jurisdiction (civil, criminal, constitutional)
• Advisory jurisdiction (Article 143)
• Judicial review power`
      },
      {
        title: "Original Jurisdiction - Article 131",
        content: `Article 131: Subject to the provisions of this Constitution, the Supreme Court shall, to the exclusion of any other court, have original jurisdiction in any dispute:

(a) between the Government of India and one or more States; or
(b) between the Government of India and any State or States on one side and one or more other States on the other; or
(c) between two or more States.

Exclusive Original Jurisdiction:
• Federal disputes only
• No other court can entertain
• Direct approach to Supreme Court
• Compulsory jurisdiction

Types of Disputes:
• Center vs State(s)
• Center and State(s) vs other State(s)
• State vs State(s)
• Inter-state water disputes (with special provision)

Important Cases:
• State of West Bengal v. Union of India (coal block allocation)
• State of Karnataka v. Union of India (Cauvery water dispute)
• State of Haryana v. State of Punjab (Chandigarh dispute)

Limitations:
• Purely legal disputes only
• No political questions
• Must involve legal rights
• Commercial disputes excluded

Procedure:
• Direct filing in Supreme Court
• No lower court involvement
• Special rules for such cases
• Usually heard by larger bench`
      },
      {
        title: "Writ Jurisdiction - Article 32",
        content: `Article 32: The right to constitutional remedies. Dr. B.R. Ambedkar called this the "heart and soul" of the Constitution.

Article 32(1): The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred in this Part is guaranteed.

Article 32(2): The Supreme Court shall have power to issue writs including habeas corpus, mandamus, prohibition, certiorari and quo-warranto, whichever may be appropriate, for the enforcement of any of the rights conferred in this Part.

Five Types of Writs:

1. Habeas Corpus ('Have the Body'):
• Protection against illegal detention
• Produces detained person before court
• Tests legality of detention
• Fundamental right to personal liberty

2. Mandamus ('We Command'):
• Compels performance of public duty
• Against public officials/bodies
• When legal duty exists but not performed
• Cannot be issued against President/Governor

3. Prohibition ('To Forbid'):
• Prevents inferior court from exceeding jurisdiction
• Issued during proceedings
• Preventive in nature
• Maintains judicial hierarchy

4. Certiorari ('To Be Informed'):
• Quashes orders of inferior courts/tribunals
• Reviews jurisdiction and procedure
• Corrective in nature
• Can be issued after decision

5. Quo-Warranto ('By What Authority'):
• Challenges person's right to hold public office
• Tests legality of appointment
• Protects public from usurpers
• Office must be public and substantive

Significance:
• Direct enforcement of fundamental rights
• No locus standi requirement for PIL
• Fastest remedy available
• Cannot be suspended except during emergency`
      },
      {
        title: "Appellate Jurisdiction - Articles 132-136",
        content: `The Supreme Court is the final court of appeal in India with comprehensive appellate jurisdiction.

Constitutional Appeals (Article 132):
• Appeals from High Court judgments
• Must involve substantial question of constitutional law
• Certificate from High Court required
• Can hear appeals in constitutional matters

Civil Appeals (Article 133):
• High Court must certify case fit for appeal
• Must involve substantial question of law of general importance
• Or High Court considers Supreme Court hearing necessary
• Leave to appeal can be granted by Supreme Court

Criminal Appeals (Article 134):
• High Court reverses acquittal and sentences to death
• High Court withdraws case from subordinate court and sentences to death
• High Court certifies case fit for appeal to Supreme Court
• Appeals against conviction with certificate

Special Leave Petition (Article 136):
• Supreme Court's discretionary jurisdiction
• Can grant special leave to appeal from any judgment
• Against any court or tribunal (except military)
• Most flexible and widely used provision
• No statutory right, purely discretionary

Review Jurisdiction (Article 137):
• Power to review its own judgments
• Must be within 30 days
• Limited to apparent errors on face of record
• No re-hearing of case on merits
• Very restrictive power

Curative Petition:
• Judicially evolved remedy
• After dismissal of review petition
• Only in case of gross miscarriage of justice
• Very limited and exceptional remedy
• Heard by same bench if available`
      },
      {
        title: "Advisory Jurisdiction - Article 143",
        content: `Article 143: If at any time it appears to the President that a question of law or fact has arisen, or is likely to arise, which is of such a nature and of such public importance that it is expedient to obtain the opinion of the Supreme Court upon it, he may refer the question to that Court.

Nature of Advisory Jurisdiction:
• Discretionary power of President
• Consultation, not binding decision
• Supreme Court can decline to answer
• Question must be of public importance

Types of References:
• Questions of law or fact
• Constitutional interpretation
• International law matters
• Treaties and agreements
• Any matter of public importance

Procedure:
• President refers question to Supreme Court
• Supreme Court examines the reference
• Can ask for additional information
• Hearings are conducted like regular cases
• Opinion is given to President

Important Advisory Cases:
• Berubari Union case (1960) - territorial transfer
• Cauvery Water Disputes case
• Ram Janmabhoomi case (2019)
• Special Courts Bill case

Characteristics:
• No binding force like judgment
• Persuasive value very high
• Government usually follows opinion
• Cannot be appealed or reviewed
• Helps in preventive constitutional adjudication

Limitations:
• Court can refuse to answer abstract questions
• Will not answer political questions
• Must involve legal issues
• Should be of sufficient public importance
• Cannot be used to bypass regular legal process`
      },
      {
        title: "Independence of Judiciary - Articles 124, 217, 222",
        content: `The Constitution ensures independence of judiciary through various provisions to maintain separation of powers and rule of law.

Security of Tenure:
• Supreme Court judges: Until 65 years
• High Court judges: Until 62 years
• Removal only through impeachment
• Fixed tenure prevents arbitrary removal

Method of Appointment:
• Collegium system (judicially developed)
• Consultation between Executive and Judiciary
• President bound by collegium's recommendation
• Ensures judicial participation in appointments

Financial Independence:
• Salaries and allowances cannot be reduced during tenure
• Charged on Consolidated Fund
• No dependence on annual budget approval
• Administrative expenses provided adequately

Administrative Independence:
• Chief Justice controls court administration
• Power to make rules for court functioning
• Control over registry and subordinate staff
• Independent budget allocation

Judicial Review:
• Power to examine constitutional validity of laws
• Can strike down unconstitutional legislation
• Final interpreter of Constitution
• Protects fundamental rights and constitutional principles

Contempt of Court:
• Courts have power to punish contempt
• Protects dignity and authority of courts
• Ensures compliance with court orders
• Prevents interference in judicial functioning

Prohibition on Practice:
• Retired judges cannot practice in lower courts
• Prevents conflict of interest
• Maintains dignity of judicial office
• Ensures impartial decision-making

Constitutional Safeguards:
• Parliament cannot discuss conduct of judges
• Exception: Impeachment proceedings
• Prevents political pressure on judiciary
• Maintains independence from legislative interference`
      }
    ]
  }
};

export function ContentReader({ onBack, articleId = "fundamental-rights" }: ContentReaderProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const content = constitutionContent[articleId as keyof typeof constitutionContent];
  
  if (!content) {
    return <div>Content not found</div>;
  }

  const handleAudioToggle = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control text-to-speech
  };

  const handleNext = () => {
    if (currentSection < content.sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setReadingProgress(((currentSection + 2) / content.sections.length) * 100);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setReadingProgress(((currentSection) / content.sections.length) * 100);
    }
  };

  const currentArticle = content.sections[currentSection];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={onBack} className="p-2">
                ←
              </Button>
              <div>
                <h1 className="text-lg text-[#000080]">{content.title}</h1>
                <p className="text-sm text-gray-600">{content.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={isBookmarked ? 'text-[#FF9933]' : 'text-gray-600'}
              >
                {isBookmarked ? '🔖' : '📖'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAudioToggle}
                className={isPlaying ? 'text-[#138808]' : 'text-gray-600'}
              >
                {isPlaying ? '⏸️' : '🔊'}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Reading Progress</span>
              <span>{Math.round(readingProgress)}%</span>
            </div>
            <Progress value={readingProgress} className="h-2" />
          </div>

          {/* Section Navigation */}
          <div className="flex gap-2 overflow-x-auto">
            {content.sections.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSection(index);
                  setReadingProgress(((index + 1) / content.sections.length) * 100);
                }}
                className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                  index === currentSection
                    ? 'bg-[#FF9933] text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                Section {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4">
        {/* Article Header */}
        <Card className="mb-6">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 ${content.color} rounded-lg flex items-center justify-center`}>
                <span className="text-white text-xl">{content.icon}</span>
              </div>
              <div>
                <h2 className="text-xl text-[#000080]">{currentArticle.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {content.readTime}
                  </Badge>
                  <Badge className="bg-[#138808] text-xs">
                    Essential Reading
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Article Content */}
        <Card className="mb-6">
          <div className="p-6">
            <div className="prose prose-sm max-w-none">
              {currentArticle.content.split('\n\n').map((paragraph, index) => (
                <div key={index} className="mb-4">
                  {paragraph.startsWith('•') ? (
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {paragraph.split('\n').map((item, i) => (
                        <li key={i} className="text-sm">
                          {item.replace('• ', '')}
                        </li>
                      ))}
                    </ul>
                  ) : paragraph.includes(':') && paragraph.split(':')[1] ? (
                    <div>
                      <h4 className="text-[#000080] mb-2">{paragraph.split(':')[0]}:</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {paragraph.split(':')[1]}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {paragraph}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Key Takeaways */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <div className="p-4">
            <h3 className="text-[#000080] mb-3 flex items-center gap-2">
              💡 Key Takeaway
            </h3>
            <p className="text-sm text-gray-700">
              {content.title === "Fundamental Rights" && currentSection === 0 && "Article 12 defines 'State' for the purpose of fundamental rights, creating the foundation for their enforcement."}
              {content.title === "Fundamental Rights" && currentSection === 1 && "Article 13 establishes constitutional supremacy and the doctrine of judicial review in India."}
              {content.title === "Fundamental Rights" && currentSection === 2 && "Article 14 establishes the fundamental principle that all persons are equal before the law in India."}
              {content.title === "Fundamental Rights" && currentSection === 3 && "Article 15 prohibits discrimination but allows positive discrimination for the advancement of backward classes."}
              {content.title === "Fundamental Rights" && currentSection === 4 && "Article 16 ensures equal opportunity in government employment while permitting reservations for social justice."}
              {content.title === "Fundamental Rights" && currentSection === 5 && "Article 17 abolishes untouchability and makes its practice a punishable offense, promoting social equality."}
              {content.title === "Fundamental Rights" && currentSection === 6 && "Article 18 abolishes titles to promote equality and prevent creation of artificial distinctions in society."}
              {content.title === "Fundamental Rights" && currentSection === 7 && "Article 19 guarantees six fundamental freedoms essential for a democratic society with reasonable restrictions."}
              {content.title === "Fundamental Rights" && currentSection === 8 && "Article 20 provides three crucial protections against arbitrary criminal prosecution and punishment."}
              {content.title === "Fundamental Rights" && currentSection === 9 && "Article 21 is the most expansive fundamental right, protecting life and personal liberty with due process."}
              {content.title === "Fundamental Rights" && currentSection === 10 && "Article 21A makes education a fundamental right for children aged 6-14 years."}
              {content.title === "Fundamental Rights" && currentSection === 11 && "Article 22 balances personal liberty with state security through regulated arrest and detention procedures."}
              
              {content.title === "Fundamental Duties" && "Article 51A lists 11 fundamental duties that every citizen should follow to strengthen democracy and national unity."}
              
              {content.title === "Directive Principles of State Policy" && currentSection === 0 && "Article 36 ensures consistency by using the same definition of 'State' as in Fundamental Rights."}
              {content.title === "Directive Principles of State Policy" && currentSection === 1 && "Article 37 clarifies that DPSPs are not enforceable but are fundamental guidelines for governance."}
              {content.title === "Directive Principles of State Policy" && currentSection >= 2 && "The Directive Principles guide the state towards creating a welfare state with social and economic justice."}
              
              {content.title === "Union Government" && "The Union Government structure ensures parliamentary democracy with separation of powers and checks and balances."}
              
              {content.title === "State Government" && "State governments follow the Union model with similar parliamentary system and separation of powers."}
              
              {content.title === "Judiciary" && "The independent judiciary serves as the guardian of the Constitution and protector of fundamental rights."}
            </p>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex gap-3 mb-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className="flex-1"
          >
            ← Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentSection === content.sections.length - 1}
            className="flex-1 bg-[#FF9933] hover:bg-[#FF9933]/90"
          >
            Next →
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            variant="outline"
            className="h-16 flex flex-col gap-1 border-[#138808] text-[#138808]"
          >
            <span className="text-lg">🧠</span>
            <span className="text-xs">Take Quiz</span>
          </Button>
          <Button
            variant="outline"
            className="h-16 flex flex-col gap-1 border-[#FF9933] text-[#FF9933]"
          >
            <span className="text-lg">💬</span>
            <span className="text-xs">Discuss</span>
          </Button>
        </div>

        {/* Related Content */}
        <Card>
          <div className="p-4">
            <h3 className="text-[#000080] mb-3">📚 Related Topics</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚖️</span>
                  <span className="text-sm">Right to Constitutional Remedies</span>
                </div>
                <Button size="sm" variant="ghost" className="text-[#FF9933]">
                  Read
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🗳️</span>
                  <span className="text-sm">Right to Freedom</span>
                </div>
                <Button size="sm" variant="ghost" className="text-[#FF9933]">
                  Read
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛡️</span>
                  <span className="text-sm">Right Against Exploitation</span>
                </div>
                <Button size="sm" variant="ghost" className="text-[#FF9933]">
                  Read
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Reading Stats */}
        <Card className="mt-6 bg-gradient-to-r from-[#FF9933]/10 to-[#138808]/10">
          <div className="p-4 text-center">
            <h3 className="text-[#000080] mb-2">📊 Your Progress</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg text-[#138808]">12</div>
                <div className="text-xs text-gray-600">Articles Read</div>
              </div>
              <div>
                <div className="text-lg text-[#FF9933]">3</div>
                <div className="text-xs text-gray-600">Bookmarked</div>
              </div>
              <div>
                <div className="text-lg text-purple-600">85%</div>
                <div className="text-xs text-gray-600">Understanding</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Floating Audio Controls */}
      {isPlaying && (
        <div className="fixed bottom-20 left-4 right-4 bg-white rounded-lg shadow-lg border">
          <div className="max-w-md mx-auto p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#138808] rounded flex items-center justify-center">
                  <span className="text-white text-sm">🔊</span>
                </div>
                <div>
                  <div className="text-sm text-[#000080]">Playing Audio</div>
                  <div className="text-xs text-gray-600">{currentArticle.title}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAudioToggle}
                className="text-[#138808]"
              >
                ⏸️
              </Button>
            </div>
            <Progress value={45} className="h-1 mt-2" />
          </div>
        </div>
      )}
    </div>
  );
}