
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  closeMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  toggleMenu, 
  activeTab, 
  setActiveTab, 
  closeMenu 
}) => {
  const handleMenuItemClick = (tabId: string) => {
    // Track mobile menu item click for analytics
    if (window.gtag) {
      window.gtag('event', 'mobile_menu_click', {
        'event_category': 'navigation',
        'event_label': tabId,
        'value': 1
      });
    }
    
    setActiveTab(tabId);
    closeMenu();
  };

  return (
    <>
      <div className="sticky top-0 z-20 bg-lake-blue-800 text-white py-3 px-4 flex justify-between items-center shadow-lg">
        <h2 className="font-semibold">Bridvaišio ežeras</h2>
        <Button 
          variant="ghost" 
          className="text-white p-1 hover:bg-white/10 rounded-full" 
          onClick={toggleMenu}
          aria-label="Meniu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 transition-all duration-300" 
          onClick={closeMenu}
        >
          <div 
            className="w-full md:w-3/4 h-auto max-h-[80vh] rounded-b-lg bg-lake-blue-800 text-white shadow-lg transform transition-transform duration-300 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-white/20">
              <h3 className="text-xl font-bold">Navigacija</h3>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 p-1 rounded-full transition-all"
                onClick={closeMenu}
                aria-label="Uždaryti meniu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="p-4">
              <div className="flex flex-col space-y-1">
                {[
                  { id: "about", label: "Apie" },
                  { id: "photos", label: "Momentai" },
                  { id: "videos", label: "Nardymo video" },
                  { id: "diving-texts", label: "Nardytojų įspūdžiai" },
                  { id: "bathymetry", label: "Detali batimetrija" }
                ].map((tab) => (
                  <button 
                    key={tab.id} 
                    className={`flex items-center justify-between p-3 border-b border-white/10 ${
                      activeTab === tab.id
                        ? 'bg-white/10 font-medium' 
                        : 'hover:bg-white/5'
                    }`}
                    onClick={() => handleMenuItemClick(tab.id)}
                  >
                    <span className="flex items-center gap-2">
                      {tab.label}
                    </span>
                    {activeTab === tab.id && (
                      <div className="w-2 h-2 rounded-full bg-lake-teal-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
