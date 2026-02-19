import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ListingState {
  location: {
    address: string;
    city: string;
    country: string;
  };
  about: {
    carModel: string;
    year: number;
    description: string;
  };
  features: string[];
  rules: string[];
  pricing: {
    dailyRate: number;
    weeklyDiscount: number;
    monthlyDiscount: number;
  };
  promotion: {
    enabled: boolean;
    discountPercentage: number;
  };
  pictures: string[];
  insurance: {
    type: string;
    coverage: number;
  };
  subscription: {
    plan: 'free' | 'good' | 'best' | null;
  };
  device: {
    deviceType: string;
  };
  easyAccess: {
    enabled: boolean;
  };
}

const initialState: ListingState = {
  location: {
    address: '',
    city: '',
    country: '',
  },
  about: {
    carModel: '',
    year: new Date().getFullYear(),
    description: '',
  },
  features: [],
  rules: [],
  pricing: {
    dailyRate: 0,
    weeklyDiscount: 0,
    monthlyDiscount: 0,
  },
  promotion: {
    enabled: false,
    discountPercentage: 0,
  },
  pictures: [],
  insurance: {
    type: '',
    coverage: 0,
  },
  subscription: {
    plan: null,
  },
  device: {
    deviceType: '',
  },
  easyAccess: {
    enabled: false,
  },
};

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    updateLocation: (state, action: PayloadAction<ListingState['location']>) => {
      state.location = action.payload;
    },
    updateAbout: (state, action: PayloadAction<ListingState['about']>) => {
      state.about = action.payload;
    },
    updateFeatures: (state, action: PayloadAction<string[]>) => {
      state.features = action.payload;
    },
    updateRules: (state, action: PayloadAction<string[]>) => {
      state.rules = action.payload;
    },
    updatePricing: (state, action: PayloadAction<ListingState['pricing']>) => {
      state.pricing = action.payload;
    },
    updatePromotion: (state, action: PayloadAction<ListingState['promotion']>) => {
      state.promotion = action.payload;
    },
    updatePictures: (state, action: PayloadAction<string[]>) => {
      state.pictures = action.payload;
    },
    updateInsurance: (state, action: PayloadAction<ListingState['insurance']>) => {
      state.insurance = action.payload;
    },
    updateSubscription: (state, action: PayloadAction<'free' | 'good' | 'best'>) => {
      state.subscription.plan = action.payload;
    },
    updateDevice: (state, action: PayloadAction<ListingState['device']>) => {
      state.device = action.payload;
    },
    updateEasyAccess: (state, action: PayloadAction<ListingState['easyAccess']>) => {
      state.easyAccess = action.payload;
    },
    loadFromLocalStorage: (_state, action: PayloadAction<ListingState>) => {
      return action.payload;
    },
    resetListing: () => initialState,
  },
});

export const {
  updateLocation,
  updateAbout,
  updateFeatures,
  updateRules,
  updatePricing,
  updatePromotion,
  updatePictures,
  updateInsurance,
  updateSubscription,
  updateDevice,
  updateEasyAccess,
  loadFromLocalStorage,
  resetListing,
} = listingSlice.actions;

export default listingSlice.reducer;
