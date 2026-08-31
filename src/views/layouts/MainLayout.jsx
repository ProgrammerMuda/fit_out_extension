import React from 'react';
import { HeaderView } from './HeaderView';
import { SidebarView } from './SidebarView';
import { PermitDetailView } from '../pages/PermitDetailView';
import { usePermitController } from '../../controllers/usePermitController';

export function MainLayout() {
  const {
    permit,
    activeMenu,
    setActiveMenu,
    sidebarOpen,
    toggleSidebar,
    searchMenuQuery,
    setSearchMenuQuery,
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    isCompleteModalOpen,
    setIsCompleteModalOpen,
    isExtensionModalOpen,
    setIsExtensionModalOpen,
    activeScenario,
    engineeringRequest,
    scheduleData,
    updateSchedule,
    advanceStep,
    handleCompleteFitout,
    handleSaveExtension,
    handleRejectExtension,
    handlePayExtensionBill,
    handleSetScenario,
    handleSimulateEngineeringRequest,
    billItems,
    totalBillAmount,
    extensionBill,
    extensionInfo,
    trackingLogs,
    extensionLogs,
    toastInfo,
    setToastInfo,
  } = usePermitController();

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Top Header */}
      <HeaderView
        onToggleSidebar={toggleSidebar}
        searchQuery={searchMenuQuery}
        onSearchChange={setSearchMenuQuery}
      />

      {/* Body with Sidebar and Main Content */}
      <div className="d-flex flex-grow-1">
        {/* Left Sidebar */}
        <SidebarView
          isOpen={sidebarOpen}
          activeMenu={activeMenu}
          onSelectMenu={setActiveMenu}
        />

        {/* Main Content Area */}
        <main className="flex-grow-1 overflow-x-hidden">
          <PermitDetailView
            permit={permit}
            isScheduleModalOpen={isScheduleModalOpen}
            setIsScheduleModalOpen={setIsScheduleModalOpen}
            isCompleteModalOpen={isCompleteModalOpen}
            setIsCompleteModalOpen={setIsCompleteModalOpen}
            isExtensionModalOpen={isExtensionModalOpen}
            setIsExtensionModalOpen={setIsExtensionModalOpen}
            activeScenario={activeScenario}
            engineeringRequest={engineeringRequest}
            scheduleData={scheduleData}
            onUpdateSchedule={updateSchedule}
            onStepClick={advanceStep}
            onCompleteFitout={handleCompleteFitout}
            onSaveExtension={handleSaveExtension}
            onRejectExtension={handleRejectExtension}
            onPayExtensionBill={handlePayExtensionBill}
            onSetScenario={handleSetScenario}
            onSimulateEngineeringRequest={handleSimulateEngineeringRequest}
            billItems={billItems}
            totalBillAmount={totalBillAmount}
            extensionBill={extensionBill}
            extensionInfo={extensionInfo}
            trackingLogs={trackingLogs}
            extensionLogs={extensionLogs}
            toastInfo={toastInfo}
            onCloseToast={() => setToastInfo(null)}
          />
        </main>
      </div>
    </div>
  );
}
