# BlackBox Casino & Raffles - QA Testing TODO

## 🚨 Critical Issues

### High Priority Fixes
- [ ] **NaN Display Bug**: Raffles page shows "NaNm" instead of proper time remaining format
- [ ] **API CSRF Protection**: All API calls return 403 errors due to missing CSRF tokens
- [ ] **Vite Template Tags**: Template tags don't work in production mode, requiring hardcoded asset links
- [ ] **High-Low Game Overlay**: Side banner overlay prevents interaction with game buttons
- [ ] **Static Assets Path**: Frontend dist folder structure not matching expected Django static paths

### Medium Priority Issues
- [ ] **Console Errors**: Vite dev server connection errors appearing in browser console
- [ ] **Mobile Navigation**: Some interactive elements may have touch target sizing issues
- [ ] **Performance**: Static file serving could be optimized

## 🔧 Technical Improvements

### Backend
- [ ] **Environment Configuration**: Add proper dotenv loading for development
- [ ] **Database Configuration**: Fix dj-database-url SQLite parsing issues  
- [ ] **API Implementation**: Implement actual promo code redemption endpoints
- [ ] **CORS Configuration**: Review and update CORS settings for API calls
- [ ] **Static File Serving**: Optimize static file configuration for production

### Frontend
- [ ] **Asset Loading**: Fix Vite manifest integration with Django templates
- [ ] **Error Handling**: Add proper error boundaries and fallback states
- [ ] **Loading States**: Add loading indicators for API calls
- [ ] **Form Validation**: Add client-side validation for promo code input
- [ ] **Accessibility**: Add ARIA labels and keyboard navigation support

## 🎨 UI/UX Enhancements

### Design Improvements
- [ ] **Time Display**: Format time remaining properly (e.g., "2h 30m" instead of "NaNm")
- [ ] **Progress Bars**: Ensure all progress bars display correct percentages
- [ ] **Button States**: Add hover and focus states for better interaction feedback
- [ ] **Mobile Touch Targets**: Ensure all buttons meet 44px minimum touch target size
- [ ] **Color Contrast**: Review color contrast ratios for accessibility compliance

### Layout Issues
- [ ] **Side Banner Overlap**: Fix side banner overlapping interactive elements
- [ ] **Mobile Menu**: Improve mobile menu animation and backdrop
- [ ] **Card Layouts**: Ensure consistent spacing and alignment across all card components
- [ ] **Responsive Images**: Add proper responsive image handling

## ✅ Functionality Testing

### Working Features ✅
- [x] **Homepage Layout**: All sections render correctly
- [x] **Navigation**: All page routing works properly
- [x] **Mobile Responsive**: Layout adapts well to mobile screens
- [x] **FAQ Accordions**: Expandable FAQ items work correctly
- [x] **Winners Table**: Displays winner data with proper formatting
- [x] **Team Profiles**: About page shows team member information
- [x] **Dev Panel**: All development testing buttons are functional
- [x] **Promo Code UI**: Input field and button states work correctly

### Needs Testing
- [ ] **Discord OAuth**: Login functionality (requires backend integration)
- [ ] **Raffle Participation**: Actual raffle entry functionality
- [ ] **Payment Processing**: Credit top-up functionality
- [ ] **Real-time Updates**: Live raffle updates and notifications
- [ ] **Admin Panel**: Administrative functions and permissions

## 🧪 Missing Features

### Core Features to Implement
- [ ] **User Authentication**: Full Discord OAuth integration
- [ ] **Credit System**: Real credit purchasing and management
- [ ] **Raffle Engine**: Backend raffle logic and drawing system
- [ ] **Payment Integration**: Torn item transfer verification
- [ ] **Notification System**: Real-time updates for wins and draws
- [ ] **User Dashboard**: Personal statistics and history
- [ ] **Admin Interface**: Raffle management and user administration

### Additional Features
- [ ] **Multi-language Support**: Internationalization
- [ ] **Dark/Light Theme**: Theme switching capability
- [ ] **Sound Effects**: Audio feedback for wins and interactions
- [ ] **Animations**: Enhanced UI animations and transitions
- [ ] **Push Notifications**: Browser notifications for important events

## 📱 Browser Compatibility

### Tested Browsers ✅
- [x] **Chrome**: Full functionality tested
- [ ] **Firefox**: Needs testing
- [ ] **Safari**: Needs testing  
- [ ] **Edge**: Needs testing
- [ ] **Mobile Safari**: Needs testing
- [ ] **Mobile Chrome**: Basic responsive testing done

## 🔒 Security Considerations

### Security Issues to Address
- [ ] **CSRF Protection**: Implement proper CSRF token handling
- [ ] **Input Sanitization**: Add XSS protection for user inputs
- [ ] **Rate Limiting**: Implement rate limiting for API endpoints
- [ ] **Authentication Security**: Secure Discord OAuth implementation
- [ ] **Data Validation**: Server-side validation for all user inputs

## 📊 Performance Optimization

### Performance Issues
- [ ] **Bundle Size**: Optimize JavaScript bundle size
- [ ] **Image Optimization**: Implement responsive images and lazy loading
- [ ] **Caching Strategy**: Add proper caching headers for static assets
- [ ] **Database Optimization**: Add database indexing and query optimization
- [ ] **CDN Integration**: Consider CDN for static asset delivery

## 📝 Documentation

### Documentation Needs
- [ ] **API Documentation**: Document all API endpoints
- [ ] **Deployment Guide**: Complete deployment documentation
- [ ] **User Guide**: Create user-facing documentation
- [ ] **Development Setup**: Improve developer onboarding docs
- [ ] **Testing Procedures**: Document QA testing procedures

## 🎯 Priority Matrix

### Immediate (This Sprint)
1. Fix NaN display bug on raffles page
2. Resolve CSRF/API connectivity issues
3. Fix High-Low game overlay problem
4. Proper Vite asset integration

### Short Term (Next Sprint)
1. Implement proper error handling
2. Add loading states
3. Fix mobile touch targets
4. Optimize static file serving

### Long Term (Future Releases)
1. Complete Discord OAuth integration
2. Implement real raffle system
3. Add comprehensive admin features
4. Performance optimizations

---

## QA Testing Summary

**Testing Date**: September 1, 2025  
**Pages Tested**: Homepage, Raffles, Games, Winners, About, High-Low Game  
**Responsive Testing**: Mobile (375px) and Desktop (1200px+)  
**Overall Status**: 🟡 Functional with known issues

**Key Findings**:
- Website core functionality is working well
- Navigation and responsive design are solid
- Several display bugs and API connectivity issues need attention
- Ready for development team to address priority items

**Recommendation**: Address critical issues before production deployment, continue with medium priority items in next iteration.