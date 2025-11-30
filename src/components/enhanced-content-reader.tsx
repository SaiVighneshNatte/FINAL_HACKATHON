import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, Bookmark, Share2, Type, Moon, Sun, BookmarkCheck, Volume2 } from 'lucide-react';

interface EnhancedContentReaderProps {
  onBack: () => void;
  articleId?: string;
}

const topicImages: Record<string, string> = {
  'fundamental-rights': 'https://images.unsplash.com/photo-1687289133469-b2a07a13b78b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdXN0aWNlJTIwc2NhbGVzJTIwbGF3fGVufDF8fHx8MTc2NDQxOTU3MHww&ixlib=rb-4.1.0&q=80&w=1080',
  'fundamental-duties': 'https://images.unsplash.com/photo-1542315099045-93937d70c67a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBwZW9wbGUlMjB0b2dldGhlcnxlbnwxfHx8fDE3NjQzMzU0NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'directive-principles': 'https://images.unsplash.com/photo-1701790644702-292e25180524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwbGlicmFyeSUyMGNvbnN0aXR1dGlvbnxlbnwxfHx8fDE3NjQ0MTk1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'union-government': 'https://images.unsplash.com/photo-1760872645959-98d5fdb49287?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwYXJsaWFtZW50JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzY0NDE5NTcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'state-government': 'https://images.unsplash.com/photo-1662728132385-11fee9b3db9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY0MzU0MDIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'judiciary': 'https://images.unsplash.com/photo-1687289133469-b2a07a13b78b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdXN0aWNlJTIwc2NhbGVzJTIwbGF3fGVufDF8fHx8MTc2NDQxOTU3MHww&ixlib=rb-4.1.0&q=80&w=1080'
};

const articleImages: Record<string, string> = {
  'Article 14': 'https://images.unsplash.com/photo-1715137403813-69f3fd1d6b4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlcXVhbGl0eSUyMHJpZ2h0cyUyMHBlb3BsZXxlbnwxfHx8fDE3NjQ0MTk3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'Article 15': 'https://images.unsplash.com/photo-1762766515870-be360744415b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNpdHklMjBpbmNsdXNpb24lMjBpbmRpYXxlbnwxfHx8fDE3NjQ0MTk3MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'Article 19': 'https://images.unsplash.com/photo-1615564553104-47a08bbf1a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlZG9tJTIwbGliZXJ0eSUyMGNvbmNlcHR8ZW58MXx8fHwxNzY0NDE5NzE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'Article 22': 'https://images.unsplash.com/photo-1620051659271-f34920de84a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xpY2UlMjBsYXclMjBlbmZvcmNlbWVudHxlbnwxfHx8fDE3NjQ0MTk3MTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
};

const constitutionContent: Record<string, any> = {
  "fundamental-rights": {
    title: "Fundamental Rights",
    subtitle: "Articles 12-35 - The Foundation of Democracy",
    icon: "⚖️",
    color: "bg-[#138808]",
    readTime: "25 min read",
    sections: [
      {
        title: "Article 12 - Definition",
        summary: "Defines 'State' for the purpose of Fundamental Rights",
        content: `In this part, unless the context otherwise requires, "the State" includes the Government and Parliament of India and the Government and the Legislature of each of the States and all local or other authorities within the territory of India or under the control of the Government of India.

Key Elements:
• Defines what constitutes "State" for fundamental rights
• Includes Central and State governments
• Covers Parliament and State legislatures
• Includes local authorities and statutory bodies
• Essential for understanding scope of fundamental rights

Judicial Interpretation:
The Supreme Court has expanded this definition to include corporations substantially controlled by the government, making fundamental rights applicable against a wider range of entities.`,
        landmark: null
      },
      {
        title: "Article 13 - Laws Inconsistent with Fundamental Rights",
        summary: "Establishes constitutional supremacy and judicial review",
        content: `All laws in force in the territory of India immediately before the commencement of this Constitution, in so far as they are inconsistent with the provisions of this Part, shall, to the extent of such inconsistency, be void.

The State shall not make any law which takes away or abridges the rights conferred by this Part and any law made in contravention of this clause shall, to the extent of the contravention, be void.

Doctrine of Eclipse:
• Pre-constitutional laws inconsistent with fundamental rights become void
• State cannot make laws violating fundamental rights
• Such laws are void ab initio (from the beginning)
• Courts have power of judicial review

Historical Significance:
This article established the principle of constitutional supremacy and judicial review in India, making the Constitution the supreme law of the land.`,
        landmark: "Kesavananda Bharati v. State of Kerala (1973)"
      },
      {
        title: "Article 14 - Right to Equality",
        summary: "Guarantees equality before law and equal protection",
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
• Differentia must have rational relation to object sought to be achieved`,
        landmark: "Maneka Gandhi v. Union of India (1978)"
      },
      {
        title: "Article 15 - Prohibition of Discrimination",
        summary: "Prohibits discrimination on various grounds",
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
• Allows reservations in private educational institutions`,
        landmark: "State of Kerala v. N.M. Thomas (1976)"
      },
      {
        title: "Article 19 - Freedom of Speech and Expression",
        summary: "Guarantees six fundamental freedoms to citizens",
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
• Now Article 300A provides limited protection to property`,
        landmark: "Bennett Coleman v. Union of India (1972)"
      },
      {
        title: "Article 21 - Protection of Life and Personal Liberty",
        summary: "Most expansive fundamental right protecting life and liberty",
        content: `No person shall be deprived of his life or personal liberty except according to procedure established by law.

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
• Right to speedy trial`,
        landmark: "K.S. Puttaswamy v. Union of India (2017) - Right to Privacy"
      },
      {
        title: "Article 22 - Protection Against Arrest and Detention",
        summary: "Safeguards against arbitrary arrest and detention",
        content: `(1) No person who is arrested shall be detained in custody without being informed, as soon as may be, of the grounds for such arrest nor shall he be denied the right to consult, and to be defended by, a legal practitioner of his choice.

(2) Every person who is arrested and detained in custody shall be produced before the nearest magistrate within a period of twenty-four hours of such arrest excluding the time necessary for the journey from the place of arrest to the court of the magistrate and no such person shall be detained in custody beyond the said period without the authority of a magistrate.

Rights of Arrested Person:
• Right to know grounds of arrest
• Right to legal representation
• Right to be produced before magistrate within 24 hours
• Protection against arbitrary detention

Preventive Detention Safeguards:
• Advisory Board review within 3 months
• Grounds to be communicated within 5-15 days
• Right to make representation
• Maximum period as prescribed by Parliament (currently 12 months)`,
        landmark: "Maneka Gandhi v. Union of India (1978)"
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
        summary: "Moral and civic obligations of Indian citizens",
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
• Guide for legislation and judicial decisions`,
        landmark: null
      }
    ]
  }
};

export function EnhancedContentReader({ onBack, articleId = 'fundamental-rights' }: EnhancedContentReaderProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [fontSize, setFontSize] = useState('medium');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [readingProgress, setReadingProgress] = useState(45);

  const content = constitutionContent[articleId];
  const totalSections = content.sections.length;
  const progressPercentage = ((currentSection + 1) / totalSections) * 100;
  const currentArticle = content.sections[currentSection];

  const toggleBookmark = (index: number) => {
    setBookmarked(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const nextSection = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const articleTitleMatch = currentArticle.title.match(/^(Article \d+[A-Z]?)/);
  const articleKey = articleTitleMatch ? articleTitleMatch[1] : '';
  const sectionImage = articleImages[articleKey] || topicImages[articleId];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-center justify-between mb-3">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setFontSize(fontSize === 'small' ? 'medium' : fontSize === 'medium' ? 'large' : 'small')}
              >
                <Type className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toggleBookmark(currentSection)}
              >
                {bookmarked.includes(currentSection) ? 
                  <BookmarkCheck className="w-4 h-4 fill-[#FF9933] text-[#FF9933]" /> : 
                  <Bookmark className="w-4 h-4" />
                }
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Section {currentSection + 1} of {totalSections}</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-1" />
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback 
          src={sectionImage}
          alt={currentArticle.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-4xl">{content.icon}</span>
            <Badge className={`${content.color} text-white`}>
              {content.title}
            </Badge>
          </div>
          <h1 className="text-2xl text-white drop-shadow-lg mb-1">
            {currentArticle.title}
          </h1>
          <p className="text-sm text-white/90 drop-shadow">
            {currentArticle.summary}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className={`max-w-2xl mx-auto p-6 ${
        fontSize === 'small' ? 'text-sm' : 
        fontSize === 'large' ? 'text-lg' : 
        'text-base'
      }`}>
        {/* Article Navigation */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {content.sections.map((section: any, index: number) => (
              <Button
                key={index}
                variant={currentSection === index ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentSection(index)}
                className={`whitespace-nowrap ${
                  currentSection === index ? 'bg-[#FF9933] hover:bg-[#FF9933]/90' : ''
                }`}
              >
                {section.title.split(' - ')[0]}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-6`}>
          <div className="p-6">
            {/* Listen to Article */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>📖</span>
                <span>{content.readTime}</span>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Volume2 className="w-4 h-4" />
                Listen
              </Button>
            </div>

            {/* Article Content */}
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed">
                {currentArticle.content}
              </div>
            </div>

            {/* Landmark Case */}
            {currentArticle.landmark && (
              <Card className="mt-6 bg-blue-50 border-blue-200">
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">⚖️</div>
                    <div>
                      <h4 className="text-sm text-[#000080] mb-1">Landmark Case</h4>
                      <p className="text-sm text-gray-700">{currentArticle.landmark}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="p-4 text-center">
              <div className="text-2xl mb-2">💡</div>
              <p className="text-xs text-gray-600">Key Points</p>
            </div>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="p-4 text-center">
              <div className="text-2xl mb-2">📝</div>
              <p className="text-xs text-gray-600">Take Notes</p>
            </div>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="p-4 text-center">
              <div className="text-2xl mb-2">❓</div>
              <p className="text-xs text-gray-600">Ask Expert</p>
            </div>
          </Card>
        </div>

        {/* Related Articles */}
        <Card className="mb-6">
          <div className="p-4">
            <h3 className="text-sm text-[#000080] mb-3">📚 Related Articles</h3>
            <div className="space-y-2">
              {content.sections.filter((_: any, i: number) => i !== currentSection).slice(0, 3).map((section: any, index: number) => (
                <div 
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => setCurrentSection(content.sections.indexOf(section))}
                >
                  <p className="text-sm text-gray-800">{section.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{section.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={prevSection}
            disabled={currentSection === 0}
            className="flex-1"
          >
            ← Previous
          </Button>
          <Button 
            onClick={nextSection}
            disabled={currentSection === totalSections - 1}
            className="flex-1 bg-[#FF9933] hover:bg-[#FF9933]/90"
          >
            {currentSection === totalSections - 1 ? 'Finish' : 'Next →'}
          </Button>
        </div>
      </div>
    </div>
  );
}
