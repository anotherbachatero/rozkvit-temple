# Workshop Booking System Setup Guide

## Using Eventbrite for Workshop Bookings

This guide will help you set up a professional booking system for your Soul Activation workshops using Eventbrite.

---

## Step 1: Create Your Eventbrite Account

1. Go to [eventbrite.com](https://www.eventbrite.com)
2. Click **"Sign Up"** (top right)
3. Create a free account (no credit card required)
4. Complete your profile with:
   - Your name: Tiana Hammar
   - Organization: Soul Activation
   - Email: tiana@soulactivation.com

---

## Step 2: Create Your First Workshop Event

1. Click **"Create Event"** in your dashboard
2. Fill in the event details:

### Basic Info
- **Event Title**: "Soul Activation Workshop"
- **Organizer**: Tiana Hammar - Soul Activation
- **Type**: Class, Training, or Workshop
- **Category**: Health & Wellness
- **Tags**: spirituality, soul activation, energy healing, meditation, wellness

### Date & Time
- **Start Date**: December 15, 2025
- **Start Time**: 2:00 PM
- **End Time**: 5:00 PM
- **Time Zone**: Your local timezone
- ✅ **Display start/end time on event page**

### Location
Choose one:
- **Venue**: Sacred Space Studio (or your physical location)
  - Add full address
  - Add venue name
- **Online Event**: For virtual workshops
  - Will provide Zoom/video link after registration

### Description
Write a compelling description:
```
Join Tiana Hammar for a transformative Soul Activation Workshop designed to awaken your soul's purpose and connect with your higher self.

What You'll Experience:
• Deep meditation and energy clearing
• Soul activation techniques
• Group healing circle
• Practical tools for spiritual growth
• Connection with like-minded souls

What to Bring:
• Comfortable clothing
• Journal and pen
• Open heart and mind
• Water bottle

Investment: $75
Limited to 20 participants for an intimate experience.

Questions? Email tiana@soulactivation.com
```

---

## Step 3: Set Up Tickets

1. Click **"Tickets"** tab
2. Click **"Create Ticket"**

### Ticket Setup
- **Ticket Name**: "Workshop Admission"
- **Quantity Available**: 20 (your max capacity)
- **Price**: $75.00
- **Sales Start**: Immediately (or set date)
- **Sales End**: December 15, 2025, 12:00 PM (2 hours before event)

### Optional Additional Tickets
- **Early Bird**: $60 (limited to first 10)
- **VIP**: $95 (includes bonus materials)

---

## Step 4: Get Your Booking Widgets

After creating your event:

### Option A: Embedded Widget
1. Go to your event dashboard
2. Click **"Marketing"** → **"Widgets & Apps"**
3. Select **"Embedded Checkout"**
4. Copy the widget code
5. Paste into your `index.html` where indicated

### Option B: Direct Button Link
1. Go to event dashboard
2. Click **"Marketing"** → **"Widgets & Apps"**
3. Select **"Button"**
4. Customize button text: "Register for Workshop"
5. Copy the code

---

## Step 5: Add to Your Website

I've already updated your website with placeholders. Just replace:

### In `index.html` (around line 179):

Replace:
```html
<div class="event-booking-widget" id="eventbrite-widget-workshop"></div>
```

With your Eventbrite widget code:
```html
<div id="eventbrite-widget-container-123456789"></div>
<script src="https://www.eventbrite.com/static/widgets/eb_widgets.js"></script>
<script type="text/javascript">
    var exampleCallback = function() {
        console.log('Order complete!');
    };
    window.EBWidgets.createWidget({
        widgetType: 'checkout',
        eventId: 'YOUR_EVENT_ID',
        iframeContainerId: 'eventbrite-widget-container-123456789',
        iframeContainerHeight: 425,
        onOrderComplete: exampleCallback
    });
</script>
```

---

## Step 6: Calendar Integration Features

Eventbrite automatically provides:
- ✅ **.ics calendar files** - Automatically sent to attendees
- ✅ **Google Calendar "Add to Calendar"** button
- ✅ **Outlook/Apple Calendar integration**
- ✅ **Automatic reminder emails** (customize in settings)

### To Customize Reminders:
1. Event Dashboard → **"Emails to Attendees"**
2. Edit reminder emails
3. Set timing: 1 week before, 1 day before, 2 hours before

---

## Step 7: Manage Capacity & Waitlist

### Check Capacity in Real-Time:
1. Dashboard → **"Manage Attendees"**
2. See: "X of 20 tickets sold"
3. Download attendee list as CSV

### Enable Waitlist (if sold out):
1. Go to **"Tickets"** section
2. Toggle on **"Add to waitlist when sold out"**
3. Auto-notify people when spots open

---

## Step 8: Payment Setup

### Free Events:
- No payment processing needed
- Just collect registrations

### Paid Events:
1. Click **"Get Paid"** in dashboard
2. Connect to:
   - **Stripe** (recommended - 2.9% + $0.30 per ticket)
   - **PayPal**
   - Bank account (direct deposit)

Eventbrite fees:
- **Free events**: FREE
- **Paid events**: 3.7% + $1.79 per ticket (or use Eventbrite Payment Processing)

---

## Step 9: Create All Your Workshops

Repeat the process for each workshop:

### Soul Activation Workshop (Dec 15)
- Venue: Virtual Event
- Capacity: 20
- Price: $75

### Winter Solstice Ceremony (Dec 22)
- Venue: Sacred Space Studio
- Capacity: 15
- Price: $60

### New Year Vision Board Workshop (Jan 12)
- Venue: Community Center
- Capacity: 25
- Price: $85

---

## Alternative Option: Calendly (For 1-on-1 Sessions)

For individual sessions, consider **Calendly** (calendly.com):

### Setup:
1. Create free account
2. Connect your Google Calendar
3. Create event types:
   - Individual Soul Activation (90 min) - $150
   - Energy Healing Session (60 min) - $120
   - Spiritual Guidance Call (45 min) - $80

4. Set availability (hours you're available)
5. Add buffer time between sessions
6. Integrate payment via Stripe or PayPal

7. Get your booking link: `calendly.com/tianahammar/soul-activation`

---

## Best Practices

### Before Each Workshop:
- [ ] Send welcome email 1 week before
- [ ] Send reminder with location/Zoom link 1 day before
- [ ] Send final reminder 2 hours before
- [ ] Prepare materials and space

### After Each Workshop:
- [ ] Send thank you email
- [ ] Request testimonials/feedback
- [ ] Offer next workshop discount
- [ ] Update website with photos (with permission)

### Managing Bookings:
- Check Eventbrite dashboard daily
- Respond to questions within 24 hours
- Update event descriptions as needed
- Share on social media weekly

---

## Cost Summary

### Eventbrite:
- **Free events**: $0
- **Paid events**: 3.7% + $1.79 per ticket
- Example: $75 ticket = $1.79 + $2.78 = **$4.57 fee** (you receive $70.43)

### Calendly (for individual sessions):
- **Free plan**: 1 event type
- **Essentials plan**: $10/month - unlimited event types, payment processing
- **Professional plan**: $15/month - team features, workflows

---

## Need Help?

### Eventbrite Support:
- Help Center: eventbrite.com/help
- Phone: 1-800-514-4487
- Email: support@eventbrite.com

### Website Integration Issues:
- Check browser console for errors
- Ensure JavaScript is enabled
- Clear cache and reload page

---

## Quick Start Checklist

- [ ] Create Eventbrite account
- [ ] Create first workshop event
- [ ] Set ticket price and capacity
- [ ] Get widget/button code
- [ ] Add to website (I'll help with this)
- [ ] Test booking process yourself
- [ ] Share on Instagram/Facebook
- [ ] Start accepting bookings! 🎉

---

**Your booking system is ready to go!** Once you have your Eventbrite event IDs, just let me know and I'll integrate them directly into your website.

