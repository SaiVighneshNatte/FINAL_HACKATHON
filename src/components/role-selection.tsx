import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

export type UserRole = 'citizen' | 'educator' | 'admin' | 'legal-expert';

interface RoleSelectionProps {
  onRoleSelect: (role: UserRole) => void;
}

const roles = [
  {
    id: 'citizen' as UserRole,
    title: 'Citizen',
    description: 'Learn about your rights, duties, and constitutional principles',
    icon: '👤',
    color: 'bg-[#138808]',
    image: 'https://images.unsplash.com/photo-1542315099045-93937d70c67a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBwZW9wbGUlMjB0b2dldGhlcnxlbnwxfHx8fDE3NjQzMzU0NjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'educator' as UserRole,
    title: 'Educator',
    description: 'Create content, conduct sessions, and track learning progress',
    icon: '👨‍🏫',
    color: 'bg-[#FF9933]',
    image: 'https://images.unsplash.com/photo-1724256278294-02f9557d4e82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwZWR1Y2F0b3IlMjB0ZWFjaGluZ3xlbnwxfHx8fDE3NjQ0MTk4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'admin' as UserRole,
    title: 'Admin',
    description: 'Manage users, approve content, and oversee platform activities',
    icon: '⚙️',
    color: 'bg-[#000080]',
    image: 'https://images.unsplash.com/photo-1758630737361-ca7532fb5e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZG1pbiUyMG1hbmFnZW1lbnQlMjBvZmZpY2V8ZW58MXx8fHwxNzY0NDE5ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'legal-expert' as UserRole,
    title: 'Legal Expert',
    description: 'Update legal content, provide guidance, and answer questions',
    icon: '⚖️',
    color: 'bg-purple-600',
    image: 'https://images.unsplash.com/photo-1758518731462-d091b0b4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXd5ZXIlMjBsZWdhbCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQ0MTk4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="w-16 h-16 bg-[#FF9933] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏛️</span>
          </div>
          <h1 className="text-2xl text-[#000080] mb-2">Choose Your Role</h1>
          <p className="text-gray-600">Select how you'd like to use Constitution Companion</p>
        </div>

        {/* Role Cards */}
        <div className="space-y-4">
          {roles.map((role) => (
            <Card key={role.id} className="border-2 hover:border-[#FF9933] transition-all overflow-hidden group hover:shadow-xl">
              <button
                onClick={() => onRoleSelect(role.id)}
                className="w-full text-left"
              >
                <div className="flex items-center gap-0">
                  {/* Image Section */}
                  <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
                    <ImageWithFallback 
                      src={role.image}
                      alt={role.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/90"></div>
                    <div className={`absolute bottom-2 left-2 w-10 h-10 ${role.color} rounded-lg flex items-center justify-center text-white shadow-lg`}>
                      <span className="text-xl">{role.icon}</span>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex-1 p-4 pr-2">
                    <h3 className="text-lg text-[#000080] mb-1">{role.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <div className="pr-4 text-[#FF9933] text-2xl group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </div>
              </button>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          You can change your role later in settings
        </div>
      </div>
    </div>
  );
}