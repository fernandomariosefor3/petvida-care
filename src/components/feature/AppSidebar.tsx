import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'ri-layout-grid-line' },
  { path: '/pets', label: 'Meus Pets', icon: 'ri-heart-2-line' },
  { path: '/reminders', label: 'Lembretes', icon: 'ri-alarm-line' },
  { path: '/health', label: 'Saúde', icon: 'ri-heart-pulse-line' },
];

export default function AppSidebar() {
  const { currentUser, logout, pets, reminders } = useApp();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdueCount = reminders.filter(
    r => !r.completed && new Date(r.date) < today
  ).length;

  const pendingCount = reminders.filter(
    r => !r.completed && new Date(r.date) >= today
  ).length;

  return (
    <aside
      className={`${collapsed ? 'w-16' : 'w-60'} min-h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 flex-shrink-0`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100">
        <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
          <img
            src="/logo.svg"
            alt="PetVida"
            className="w-12 h-12 object-contain"
          />
        </div>
        {!collapsed && (
          <span className="font-bold text-gray-800 text-lg tracking-tight">PetVida</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-400 cursor-pointer"
        >
          <i className={`${collapsed ? 'ri-menu-unfold-line' : 'ri-menu-fold-line'} text-sm`}></i>
        </button>
      </div>

      {/* User info */}
      {!collapsed && currentUser && (
        <div className="px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <span className="text-emerald-600 font-semibold text-sm">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{currentUser.name}</p>
              <p className="text-xs text-gray-400 truncate">
                {pets.length} pet{pets.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => {
          const isReminders = item.path === '/reminders';
          const showOverdueBadge = isReminders && overdueCount > 0;
          const showPendingBadge = isReminders && !showOverdueBadge && pendingCount > 0;
          const badgeCount = showOverdueBadge ? overdueCount : pendingCount;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`
              }
            >
              {/* Icon with collapsed badge */}
              <div className="relative w-5 h-5 flex items-center justify-center flex-shrink-0">
                <i className={`${item.icon} text-base`}></i>
                {/* Badge on icon when collapsed */}
                {collapsed && (showOverdueBadge || showPendingBadge) && (
                  <span
                    className={`absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] flex items-center justify-center rounded-full text-white text-[9px] font-bold px-0.5 ${
                      showOverdueBadge ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                  >
                    {badgeCount > 9 ? '9+' : badgeCount}
                  </span>
                )}
              </div>

              {/* Label */}
              {!collapsed && (
                <span className="flex-1">{item.label}</span>
              )}

              {/* Badge when expanded */}
              {!collapsed && (showOverdueBadge || showPendingBadge) && (
                <span
                  className={`text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center flex-shrink-0 px-1 font-semibold ${
                    showOverdueBadge ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                >
                  {badgeCount}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Overdue alert banner — expanded only */}
      {!collapsed && overdueCount > 0 && (
        <div className="mx-3 mb-3 px-3 py-2.5 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2">
          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
            <i className="ri-error-warning-line text-rose-500 text-sm"></i>
          </div>
          <p className="text-xs text-rose-600 font-medium leading-tight">
            {overdueCount} lembrete{overdueCount > 1 ? 's' : ''} atrasado{overdueCount > 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer w-full whitespace-nowrap"
        >
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
            <i className="ri-logout-box-line text-base"></i>
          </div>
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}
