import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import type { RootState } from '../store';
import { updateDevice } from '../store/slices/listingSlice';
import './DeviceManagement.scss';

const DeviceManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const deviceState = useAppSelector((state: RootState) => state.listing.device);
  const primaryDevice = deviceState.devices.find((d) => d.id === 1);
  const driveMateDevice = deviceState.devices.find((d) => d.id === 3);

  const handleToggleChange = useCallback(
    (id: number) => {
      const updatedDevices = deviceState.devices.map((device) =>
        device.id === id ? { ...device, bringYourOwn: !device.bringYourOwn } : device
      );

      dispatch(updateDevice({ devices: updatedDevices }));
    },
    [deviceState.devices, dispatch]
  );

  const handleSerialChange = useCallback(
    (id: number, value: string) => {
      const updatedDevices = deviceState.devices.map((device) =>
        device.id === id ? { ...device, serialNumber: value } : device
      );

      dispatch(updateDevice({ devices: updatedDevices }));
    },
    [deviceState.devices, dispatch]
  );

  const handleUpload = useCallback(
    (id: number, file: File | null) => {
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const updatedDevices = deviceState.devices.map((device) =>
          device.id === id ? { ...device, image: typeof reader.result === 'string' ? reader.result : null } : device
        );

        dispatch(updateDevice({ devices: updatedDevices }));
      };

      reader.readAsDataURL(file);
    },
    [deviceState.devices, dispatch]
  );

  const handleNext = () => {
    navigate('/easy-access');
  };

  return (
    <div className="device-management">
      <div className="device-management__container">
        <header className="device-management__header">
          <h1 className="device-management__title">Device management</h1>
          <p className="device-management__subtitle">
            Add details of the device, if any already installed on your car. If none, then continue to next step.
          </p>
        </header>

        <div className="device-management__content">
          {deviceState.devices.map((device) => {
            // When Device 2 toggle is OFF, show Device 1's simple layout
            if (device.id === 2 && !device.bringYourOwn && primaryDevice) {
              return (
                <section key={device.id} className="device-card">
                  <div className="device-card__inner">
                    <div className="device-card__left">
                      <h2 className="device-card__name">Device 1</h2>

                      <div className="device-card__field-group">
                        <label className="device-card__label">Device type</label>
                        <input
                          className="device-card__input"
                          type="text"
                          value={primaryDevice.deviceType}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="device-card__right">
                      <div className="device-card__toggle-row">
                        <div className="device-card__toggle-text">
                          <div className="device-card__label device-card__label--inline">
                            Bringing your own device?
                          </div>
                          <p className="device-card__description">
                            Toggle this on if you&apos;re bringing your own device. Leave it off if Drive mate is to
                            provide the device.
                          </p>
                        </div>

                        <label className="toggle-switch" aria-label="Bringing your own device">
                          <input
                            type="checkbox"
                            checked={device.bringYourOwn}
                            onChange={() => handleToggleChange(device.id)}
                          />
                          <span className="toggle-switch__slider" />
                        </label>
                      </div>
                    </div>
                  </div>
                </section>
              );
            }

            // When Device 4 toggle is OFF, show Device 3's simple layout
            if (device.id === 4 && !device.bringYourOwn && driveMateDevice) {
              return (
                <section key={device.id} className="device-card">
                  <div className="device-card__inner">
                    <div className="device-card__left">
                      <h2 className="device-card__name">Device 3</h2>

                      <div className="device-card__field-group">
                        <label className="device-card__label">Device type</label>
                        <input
                          className="device-card__input"
                          type="text"
                          value={driveMateDevice.deviceType}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="device-card__right">
                      <div className="device-card__toggle-row">
                        <div className="device-card__toggle-text">
                          <div className="device-card__label device-card__label--inline">
                            Bringing your own device?
                          </div>
                          <p className="device-card__description">
                            Toggle this on if you&apos;re bringing your own device. Leave it off if Drive mate is to
                            provide the device.
                          </p>
                        </div>

                        <label className="toggle-switch" aria-label="Bringing your own device">
                          <input
                            type="checkbox"
                            checked={device.bringYourOwn}
                            onChange={() => handleToggleChange(device.id)}
                          />
                          <span className="toggle-switch__slider" />
                        </label>
                      </div>
                    </div>
                  </div>
                </section>
              );
            }

            // Default layout for all devices
            return (
              <section key={device.id} className="device-card">
                <div className="device-card__inner">
                  <div className="device-card__left">
                    <h2 className="device-card__name">{device.name}</h2>

                    <div className="device-card__field-group">
                      <label className="device-card__label">Device type</label>
                      <input
                        className="device-card__input"
                        type="text"
                        value={device.deviceType}
                        readOnly
                      />
                    </div>

                    {/* Serial number: hidden when toggle is OFF for Device 1, 2, 3; always shown for Device 4 */}
                    {((device.id === 1 || device.id === 2 || device.id === 3) ? device.bringYourOwn : true) && (
                      <div className="device-card__field-group">
                        <label className="device-card__label">Serial number</label>
                        <input
                          className="device-card__input"
                          type="text"
                          placeholder="Enter the serial number of the device"
                          value={device.serialNumber}
                          onChange={(e) => handleSerialChange(device.id, e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  <div className="device-card__right">
                    <div className="device-card__toggle-row">
                      <div className="device-card__toggle-text">
                        <div className="device-card__label device-card__label--inline">
                          Bringing your own device?
                        </div>
                        <p className="device-card__description">
                          Toggle this on if you&apos;re bringing your own device. Leave it off if Drive mate is to
                          provide the device.
                        </p>
                      </div>

                      <label className="toggle-switch" aria-label="Bringing your own device">
                        <input
                          type="checkbox"
                          checked={device.bringYourOwn}
                          onChange={() => handleToggleChange(device.id)}
                        />
                        <span className="toggle-switch__slider" />
                      </label>
                    </div>

                    {/* Upload area: hidden when toggle is OFF for Device 1, 2, 3; always shown for Device 4 */}
                    {((device.id === 1 || device.id === 2 || device.id === 3) ? device.bringYourOwn : true) && (
                      <div className="device-card__upload">
                        <p className="device-card__label">Upload an image of the device</p>
                        <label className="upload-box">
                          <input
                            type="file"
                            accept="image/*"
                            className="upload-box__input"
                            onChange={(e) => handleUpload(device.id, e.target.files?.[0] ?? null)}
                          />
                          <span className="upload-box__text">Click to upload</span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <div className="device-management__actions">
          <button className="device-management__button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceManagement;
