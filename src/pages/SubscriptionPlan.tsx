import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateSubscription } from '../store/slices/listingSlice';
import type { RootState } from '../store';
import asset1 from '../assets/asset1.svg';
import asset2 from '../assets/asset2.svg';
import asset3 from '../assets/asset3.svg';
import './SubscriptionPlan.scss';

type PlanType = 'free' | 'good' | 'best';

interface Plan {
  id: PlanType;
  name: string;
  price: string;
  features: string[];
}

const SubscriptionPlan: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPlan = useAppSelector((state: RootState) => state.listing.subscription.plan);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(currentPlan);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Just mates',
      price: 'Free',
      features: [
        'Bring your own GPS',
        'Mileage reporting to be done by you',
        'In-person key handover to guests',
      ],
    },
    {
      id: 'good',
      name: 'Good mates',
      price: '$10/month',
      features: [
        'Primary GPS included',
        'Automated mileage calculations',
        'In-person key handover to guests',
      ],
    },
    {
      id: 'best',
      name: 'Best mates',
      price: '$30/month',
      features: [
        'Keyless access technology',
        'Automated mileage calculations',
        'Remote handover to guests',
      ],
    },
  ];

  const handlePlanSelect = (planId: PlanType) => {
    setSelectedPlan(planId);
    setSelectedAddons([]);
  };

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const getAddonsForPlan = (planType: PlanType | null) => {
    if (!planType) return [];
    
    switch (planType) {
      case 'free':
        return [
          { id: 'secondary-gps', label: 'BYO secondary GPS - $5/month', disabled: false }
        ];
      case 'good':
        return [
          { id: 'secondary-gps', label: 'BYO secondary GPS - $5/month', disabled: false },
          { id: 'lockbox', label: 'BYO lockbox - $10/month', disabled: false }
        ];
      case 'best':
        return [
          { id: 'secondary-gps', label: 'BYO secondary GPS - $5/month', disabled: false },
          { id: 'trip-insurance', label: 'Between trip insurance', disabled: true, comingSoon: true }
        ];
      default:
        return [];
    }
  };

  const shouldShowCardDetails = () => {
    return selectedPlan === 'good' || selectedPlan === 'best';
  };

  const handleNext = () => {
    if (selectedPlan) {
      dispatch(updateSubscription(selectedPlan));
      navigate('/device');
    }
  };

  return (
    <div className="subscription-plan">
      <div className="subscription-plan__container">
        <div className="subscription-plan__header">
          <h1 className="subscription-plan__title">Subscription plan</h1>
          <p className="subscription-plan__subtitle">
            Select the ideal subscription plan for your listing.
          </p>
        </div>

        <div className="subscription-plan__select-label">
          Select your plan
        </div>

        <div className="subscription-plan__plans">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${selectedPlan === plan.id ? 'plan-card--selected' : ''}`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              <div className="plan-card__header">
                <div className="plan-card__info">
                  <h3 className="plan-card__name">{plan.name}</h3>
                </div>
              </div>

              <ul className="plan-card__features">
                {plan.features.map((feature, index) => {
                  const icons = [asset1, asset2, asset3];
                  return (
                    <li key={index} className="plan-card__feature">
                      <img src={icons[index]} alt="" className="plan-card__icon" />
                      <span>{feature}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="plan-card__price">{plan.price}</div>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="subscription-plan__addons">
            <h3 className="subscription-plan__addons-title">Select add-ons for your subscription</h3>
            <div className="subscription-plan__addons-list">
              {getAddonsForPlan(selectedPlan).map((addon) => (
                <div key={addon.id} className="addon-option">
                  <label className="addon-option__label">
                    <span className="addon-option__text">
                      {addon.label}
                      {addon.comingSoon && <span className="addon-option__badge">Coming soon</span>}
                    </span>
                    <input
                      type="checkbox"
                      className="addon-option__checkbox"
                      checked={selectedAddons.includes(addon.id)}
                      onChange={() => handleAddonToggle(addon.id)}
                      disabled={addon.disabled}
                    />
                    <span className="addon-option__radio"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {shouldShowCardDetails() && (
          <div className="subscription-plan__card-details">
            <h3 className="subscription-plan__card-title">Add card details</h3>
            <div className="subscription-plan__card-form">
              <div className="card-input">
                <div className="card-input__icon">
                  <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                    <rect x="0.5" y="0.5" width="19" height="15" rx="1.5" stroke="#CCCCCC"/>
                    <rect x="0" y="3" width="20" height="3" fill="#CCCCCC"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="1234 5678 1234 5678" 
                  className="card-input__field"
                />
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  className="card-input__field card-input__field--small"
                />
                <input 
                  type="text" 
                  placeholder="CVC" 
                  className="card-input__field card-input__field--small"
                />
              </div>
              <p className="subscription-plan__card-note">
                You will not be charged right now. Subscription will only start once your listing is published and live.
              </p>
            </div>
          </div>
        )}

        <div className="subscription-plan__info">
          <p>
            Learn more about the plans here -{' '}
            <a href="#" className="subscription-plan__link">
              What is the right plan for me?
            </a>
          </p>
          <p className="subscription-plan__note">
            You will be able to switch between plans easily later as well. Speak to our host
            success team if you need any clarifications.
          </p>
        </div>

        {/* <div className="subscription-plan__actions">
          <button
            className="subscription-plan__button"
            onClick={handleNext}
            disabled={!selectedPlan}
          >
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default SubscriptionPlan;
