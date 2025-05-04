import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UserVerificationComponent } from './components/user-verification/user-verification.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ReqSessoinAppointmentComponent } from './components/req-sessoin-appointment/req-sessoin-appointment.component';
import { ReqMeetingAppointmentComponent } from './components/req-meeting-appointment/req-meeting-appointment.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PackageComponent } from './components/package/package.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PortfolioCategoryComponent } from './components/portfolio-category/portfolio-category.component';
import { PortfolioAlbumComponent } from './components/portfolio-album/portfolio-album.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { ClientAccountComponent } from './components/client-account/client-account.component';
import { UpcomingSessionAppointmentsComponent } from './components/upcoming-session-appointments/upcoming-session-appointments.component';
import { UpcomingMeetingAppointmentsComponent } from './components/upcoming-meeting-appointments/upcoming-meeting-appointments.component';
import { PastSessionComponent } from './components/past-session/past-session.component';
import { PhotographerAccountComponent } from './components/photographer-account/photographer-account.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { PendingMeetingAppointmentsComponent } from './components/pending-meeting-appointments/pending-meeting-appointments.component';
import { ConfirmedMeetingAppointmentsComponent } from './components/confirmed-meeting-appointments/confirmed-meeting-appointments.component';
import { PendingSessionAppointmentsComponent } from './components/pending-session-appointments/pending-session-appointments.component';
import { ConfirmedSessionAppointmentsComponent } from './components/confirmed-session-appointments/confirmed-session-appointments.component';
import { AddPackageComponent } from './components/add-package/add-package.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'verification',
    component: UserVerificationComponent 
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent 
  },
  {
    path: 'request-session-appointment',
    component: ReqSessoinAppointmentComponent
  },
  {
    path: 'request-meeting-appointment',
    component: ReqMeetingAppointmentComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'packages',
    component: PackageComponent
  },
  {
    path: 'portfolio',
    component: PortfolioComponent
  },
  {
    path: 'portfolio-category/:id',
    component: PortfolioCategoryComponent
  },
  {
    path: 'portfolio-album/:id',
    component: PortfolioAlbumComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'blog-post/:id',
    component: BlogPostComponent
  },
  {
    path: 'client-account/:id',
    component: ClientAccountComponent
  },
  {
    path: 'my-account',
    component: ClientAccountComponent
  },
  {
    path: 'upcoming-session-appointments',
    component: UpcomingSessionAppointmentsComponent
  },
  {
    path: 'upcoming-meeting-appointments',
    component: UpcomingMeetingAppointmentsComponent
  },
  {
    path: 'past-sessoins',
    component: PastSessionComponent
  },
  {
    path: 'photographer-account',
    component: PhotographerAccountComponent
  },
  {
    path: 'add-blog',
    component: AddBlogComponent
  },
  {
    path: 'edit-blog',
    component: AddBlogComponent
  },
  {
    path: 'edit-blog',
    component : EditBlogComponent
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent
  },
  {
    path: 'pending-meeting-appointments',
    component: PendingMeetingAppointmentsComponent
  },
  {
    path: 'confirmed-meeting-appointments',
    component: ConfirmedMeetingAppointmentsComponent
  },
  {
    path: 'pending-session-appointments',
    component: PendingSessionAppointmentsComponent
  },
  {
    path: 'confirmed-session-appointments',
    component: ConfirmedSessionAppointmentsComponent
  },
  {
    path: 'add-package',
    component: AddPackageComponent
    
  }
  



];


