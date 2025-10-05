# Eventbrite Integration - Quick Start

## ✅ What's Already Set Up

Your website now has a complete booking system infrastructure with:
- 📅 **Calendar integration** (.ics file download)
- 🎟️ **Eventbrite booking buttons**
- 👥 **Capacity tracking display**
- 📱 **Mobile-responsive design**
- 🎨 **Beautiful booking UI**

---

## 🚀 3 Steps to Go Live

### Step 1: Create Your Events on Eventbrite

1. Go to [eventbrite.com](https://www.eventbrite.com) and sign up
2. Click **"Create Event"**
3. Fill in details for each workshop:

**Workshop 1: Soul Activation Workshop**
- Date: December 15, 2025
- Time: 2:00 PM - 5:00 PM
- Capacity: 20 people
- Price: $75

**Workshop 2: Winter Solstice Ceremony**
- Date: December 22, 2025
- Time: 7:00 PM - 9:00 PM
- Capacity: 15 people
- Price: $60

**Workshop 3: New Year Vision Board Workshop**
- Date: January 12, 2025
- Time: 1:00 PM - 4:00 PM
- Capacity: 25 people
- Price: $85

---

### Step 2: Get Your Event URLs

After creating each event:

1. Click on your event
2. Copy the URL from your browser (it looks like):
   ```
   https://www.eventbrite.com/e/soul-activation-workshop-tickets-123456789
   ```

3. You'll have 3 URLs (one for each workshop)

---

### Step 3: Update Your Website

Open `/Users/R01382/Soul activation/script.js` and find this section (around line 713):

**Replace these placeholder URLs:**

```javascript
const eventbriteUrls = {
    'workshop': 'https://www.eventbrite.com/e/soul-activation-workshop-tickets-123456789',
    'solstice': 'https://www.eventbrite.com/e/winter-solstice-ceremony-tickets-123456789',
    'vision': 'https://www.eventbrite.com/e/vision-board-workshop-tickets-123456789'
};
```

**With YOUR actual Eventbrite URLs:**

```javascript
const eventbriteUrls = {
    'workshop': 'YOUR_WORKSHOP_URL_HERE',
    'solstice': 'YOUR_SOLSTICE_URL_HERE',
    'vision': 'YOUR_VISION_BOARD_URL_HERE'
};
```

Also update the calendar URLs in the `addToCalendar` function (around line 738, 746, and 754).

---

## 📋 Testing Your Booking System

1. Open your website: `index.html`
2. Scroll to the "Upcoming Workshops" section
3. Click **"Book on Eventbrite"** - should open your Eventbrite page
4. Click **"Add to Calendar"** - should download a `.ics` file
5. Open the downloaded file - should add to your calendar app

---

## 🎨 Optional: Embed Eventbrite Widget Directly

For a more integrated experience, you can embed Eventbrite's checkout widget:

### In `index.html`:

Find the section with:
```html
<!-- EVENTBRITE WIDGET: Replace the div below with your Eventbrite widget code -->
<div class="event-booking-widget" id="eventbrite-widget-workshop">
```

Replace the buttons with Eventbrite's embedded widget:

1. Go to Eventbrite event dashboard
2. Click **"Marketing"** → **"Widgets & Apps"**
3. Select **"Embedded Checkout"**
4. Copy the provided code
5. Paste it in place of the button div

**Example widget code:**
```html
<div id="eventbrite-widget-container-123456789"></div>
<script src="https://www.eventbrite.com/static/widgets/eb_widgets.js"></script>
<script type="text/javascript">
    window.EBWidgets.createWidget({
        widgetType: 'checkout',
        eventId: 'YOUR_EVENT_ID',
        iframeContainerId: 'eventbrite-widget-container-123456789'
    });
</script>
```

---

## 💡 Features You Have Now

### ✅ All Your Requirements Met:

1. **✅ Set Time & Place**: Done via Eventbrite event creation
2. **✅ Easy Calendar Integration**: Automatic .ics file download
3. **✅ Verify Available Places**: Real-time capacity display
4. **✅ Set Max Limit**: Configured per event on Eventbrite
5. **✅ Payment Processing**: Built into Eventbrite
6. **✅ Email Confirmations**: Automatic from Eventbrite
7. **✅ Mobile Friendly**: Responsive design

### 📊 Additional Features:

- Automatic email reminders to attendees
- Attendee list management
- Refund handling
- Waitlist when sold out
- QR code tickets
- Check-in app for events

---

## 💰 Cost Breakdown

### Eventbrite Pricing:
- **Free events**: $0 fee
- **Paid events**: 3.7% + $1.79 per ticket

**Example for your workshops:**
- $75 ticket → Fee: $4.57 → You receive: **$70.43**
- $60 ticket → Fee: $4.01 → You receive: **$55.99**
- $85 ticket → Fee: $4.94 → You receive: **$80.06**

---

## 📱 Managing Your Workshops

### From Eventbrite Dashboard:

1. **View Bookings**: See who registered in real-time
2. **Check Capacity**: Monitor seats remaining
3. **Send Updates**: Email all attendees
4. **Export List**: Download attendee data
5. **Track Revenue**: See earnings per event

---

## 🆘 Need Help?

### Common Issues:

**Q: Button doesn't open Eventbrite**
- A: Make sure you updated the URLs in `script.js`

**Q: Calendar file doesn't download**
- A: Check browser settings - allow downloads from your site

**Q: Widget not showing**
- A: Verify you copied the full widget code from Eventbrite

**Q: Mobile view looks off**
- A: Clear browser cache and refresh

---

## 🎉 You're Ready!

Your booking system is fully set up. Once you add your Eventbrite URLs, you can:

1. ✅ Accept workshop registrations
2. ✅ Process payments securely
3. ✅ Send automatic confirmations
4. ✅ Track attendance
5. ✅ Manage capacity limits

**Next Steps:**
1. Create events on Eventbrite (15 minutes)
2. Copy event URLs into `script.js` (2 minutes)
3. Test the booking flow (5 minutes)
4. Share on social media! 🎊

---

**Questions?** Email: tiana@soulactivation.com

**Full Setup Guide:** See `BOOKING_SETUP_GUIDE.md` for detailed instructions

