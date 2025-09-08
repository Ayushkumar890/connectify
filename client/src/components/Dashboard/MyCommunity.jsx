import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Hash, ArrowRight, Crown, Calendar } from 'lucide-react';

const MyCommunity = ({ community }) => {
  return (
    <div className="group">
      <Link to={`/community/${community._id}/members`}>
        <div className="relative bg-black border border-white hover:border-green/50 rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green/10 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 right-4 w-16 h-16 border border-green/20 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border border-green/20 rounded-full"></div>
          </div>
          
          {/* Header */}
          <div className="relative z-10 mb-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green/20 to-emerald-600/20 rounded-full flex items-center justify-center border border-green/30">
                  <Hash className="w-6 h-6 text-green" />
                </div>
                <div className="flex items-center space-x-2">
                  <Crown className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-yellow-400 font-medium">Owner</span>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-5 h-5 text-green group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-green transition-colors duration-300">
              {community.name}
            </h2>
          </div>
          
          {/* Description */}
          <div className="relative z-10 mb-4">
            <p className="text-zinc-300 text-sm leading-relaxed line-clamp-2 group-hover:text-zinc-200 transition-colors duration-300">
              "{community.description}"
            </p>
          </div>
          
          {/* Stats */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Hash className="w-4 h-4 text-green" />
                <span className="text-xs text-green font-semibold">
                  {community.category}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-green" />
                <span className="text-xs text-green font-semibold">
                  {community.members?.length || 0} members
                </span>
              </div>
            </div>
            
            {/* Activity Indicator */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-600/30">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green rounded-full animate-pulse"></div>
                <span className="text-xs text-zinc-400">Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-3 h-3 text-zinc-400" />
                <span className="text-xs text-zinc-400">Community</span>
              </div>
            </div>
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          
          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-2xl"></div>
        </div>
      </Link>
    </div>
  );
};

export default MyCommunity;