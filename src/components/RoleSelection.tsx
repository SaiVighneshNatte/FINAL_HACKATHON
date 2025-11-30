import React from 'react';
import { User, GraduationCap, ShieldCheck, Scale } from 'lucide-react';
import { UserRole } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  const roles = [
    {
      id: 'citizen' as UserRole,
      title: 'Citizen',
      description: 'Browse constitutional content, take quizzes, and participate in discussions',
      icon: User,
      color: '#FF9933',
      image: 'https://images.unsplash.com/photo-1758270704522-f091f8064a81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwbW9iaWxlfGVufDF8fHx8MTc2NDQzMTcwMXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'educator' as UserRole,
      title: 'Educator',
      description: 'Create content, manage live sessions, and track student progress',
      icon: GraduationCap,
      color: '#138808',
      image: 'https://images.unsplash.com/flagged/photo-1574097656146-0b43b7660cb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBjbGFzc3Jvb20lMjBpbmRpYXxlbnwxfHx8fDE3NjQ0MzE3MDB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'admin' as UserRole,
      title: 'Admin',
      description: 'Manage users, approve content, and oversee platform operations',
      icon: ShieldCheck,
      color: '#000080',
      image: 'https://images.unsplash.com/photo-1646298714297-5e13878336c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBpbmRpYXxlbnwxfHx8fDE3NjQ0MzE3MDB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'legal-expert' as UserRole,
      title: 'Legal Expert',
      description: 'Answer questions, update constitutional content, and provide expert insights',
      icon: Scale,
      color: '#FF9933',
      image: 'https://images.unsplash.com/photo-1676181739500-e1291b113370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdWRnZSUyMGxlZ2FsJTIwY291cnR8ZW58MXx8fHwxNzY0NDMxNzAxfDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white px-6 py-8" style={{ maxWidth: '390px', margin: '0 auto' }}>
      <div className="mb-8">
        <h1 className="mb-2" style={{ color: '#FF9933' }}>
          Select Your Role
        </h1>
        <p className="text-gray-600">
          Choose how you'd like to explore the Constitution of India
        </p>
      </div>

      <div className="space-y-4">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className="w-full bg-white rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-lg active:scale-98 border border-gray-100"
            >
              <div className="flex items-center p-4 gap-4">
                {/* Image */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <ImageWithFallback 
                    src={role.image}
                    alt={role.title}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: `${role.color}CC` }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-left">
                  <h3 className="mb-1" style={{ color: role.color }}>
                    {role.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {role.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          You can always change your role later in settings
        </p>
      </div>
    </div>
  );
};
