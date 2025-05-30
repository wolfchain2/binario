
import React from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabSwitcherProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  navClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  navClassName = "flex flex-wrap space-x-1 border-b border-gray-200 mb-4 sm:mb-6", // Added flex-wrap
  activeTabClassName = "bg-teal-600 text-white",
  inactiveTabClassName = "bg-gray-200 text-gray-700 hover:bg-gray-300"
}) => {
  return (
    <div>
      <nav className={navClassName} aria-label="Tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-2 px-3 sm:py-2.5 sm:px-4 md:px-5 font-medium text-xs sm:text-sm rounded-t-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-colors duration-150 mb-1 sm:mb-0 ${ // Added mb-1 for wrapped items
              activeTabId === tab.id ? activeTabClassName : inactiveTabClassName
            }`}
            role="tab"
            aria-selected={activeTabId === tab.id}
            aria-controls={`tab-panel-${tab.id}`}
            id={`tab-button-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div>
        {tabs.map(tab => (
          <div
            key={tab.id}
            id={`tab-panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-button-${tab.id}`}
            className={activeTabId === tab.id ? '' : 'hidden'}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabSwitcher;