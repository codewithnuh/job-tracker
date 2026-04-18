import { LegalPageLayout } from "@/components/legal-page-layout"

export const metadata = {
  title: "Privacy Policy - JobTracker",
  description: "Learn how JobTracker protects and manages your data with our comprehensive privacy policy.",
}

export default function PrivacyPage() {
  const h2Classes = "text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6"
  const h3Classes = "text-xl font-semibold text-foreground mb-4 mt-8"
  const pClasses = "text-lg leading-relaxed text-muted-foreground mb-6"
  const listClasses = "list-disc pl-6 space-y-2 text-muted-foreground mb-8 text-lg"

  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="April 18, 2026">
      <section>
        <h2 className={h2Classes}>1. Our Commitment to Your Privacy</h2>
        <p className={pClasses}>
          At JobTracker ("we," "our," or "us"), we are committed to protecting your personal information and your right to privacy. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or use our platform. We built JobTracker to be a tool that empowers job seekers, and central to that mission is maintaining the trust you place in us with your job search data.
        </p>
      </section>

      <section>
        <h2 className={h2Classes}>2. Information We Collect</h2>
        <h3 className={h3Classes}>A. Personal Information</h3>
        <p className={pClasses}>
          When you register for an account, we collect information that identifies you personally, which may include:
        </p>
        <ul className={listClasses}>
          <li><strong className="text-foreground">Account Details:</strong> Your name and email address.</li>
          <li><strong className="text-foreground">Authentication Data:</strong> Securely hashed passwords or third-party authentication tokens.</li>
        </ul>

        <h3 className={h3Classes}>B. Application and Search Data</h3>
        <p className={pClasses}>
          As you use JobTracker, you provide data related to your professional career and job search, including:
        </p>
        <ul className={listClasses}>
          <li>Company names, job titles, and roles.</li>
          <li>Salary expectations and offer details.</li>
          <li>Job descriptions and original posting URLs.</li>
          <li>Interview notes, contact persons, and follow-up schedules.</li>
        </ul>
      </section>

      <section>
        <h2 className={h2Classes}>3. How We Use Your Data</h2>
        <p className={pClasses}>
          We use your information strictly to provide and improve the JobTracker experience:
        </p>
        <ul className={listClasses}>
          <li><strong className="text-foreground">Service Delivery:</strong> To manage your account and synchronize your application pipeline across all your devices.</li>
          <li><strong className="text-foreground">Personalized Analytics:</strong> To generate insights and statistics about your job hunt progress.</li>
          <li><strong className="text-foreground">Communication:</strong> To send essential service notifications, such as password resets or critical system updates.</li>
          <li><strong className="text-foreground">Improvement:</strong> To analyze how users interact with our platform to identify areas for better performance and user experience.</li>
        </ul>
      </section>

      <section>
        <h2 className={h2Classes}>4. Data Sharing and Disclosure</h2>
        <p className={pClasses}>
          <strong className="text-foreground">We do not sell your personal data to third parties.</strong> We only share information in the following limited circumstances:
        </p>
        <ul className={listClasses}>
          <li><strong className="text-foreground">Service Providers:</strong> We may share data with trusted third-party vendors (like database hosting or email services) who perform services for us, strictly under confidentiality agreements.</li>
          <li><strong className="text-foreground">Legal Obligations:</strong> If required by law, we may disclose information to comply with legal processes or protect the rights and safety of our users.</li>
        </ul>
      </section>

      <section>
        <h2 className={h2Classes}>5. Data Security and Storage</h2>
        <p className={pClasses}>
          We utilize industry-standard security protocols to keep your data safe. This includes SSL/TLS encryption for data in transit and secure hashing for sensitive information at rest. While we strive to protect your data, no system is infallible, and we encourage you to use strong, unique passwords for your JobTracker account.
        </p>
      </section>

      <section>
        <h2 className={h2Classes}>6. Your Rights and Controls</h2>
        <p className={pClasses}>
          You have full control over your data on JobTracker:
        </p>
        <ul className={listClasses}>
          <li><strong className="text-foreground">Access and Export:</strong> You can view your data through our dashboard at any time.</li>
          <li><strong className="text-foreground">Correction:</strong> You can modify any of your application data or account details through the platform.</li>
          <li><strong className="text-foreground">Deletion:</strong> You can request the permanent deletion of your account and all associated data by contacting our support team.</li>
        </ul>
      </section>

      <section>
        <h2 className={h2Classes}>7. Contact Us</h2>
        <p className={pClasses}>
          If you have any questions or concerns about this Privacy Policy or our data practices, please reach out to us at:
        </p>
        <p className={pClasses}>
          <strong className="text-foreground">Email:</strong> <a href="mailto:privacy@job-tracker.noorulhassan.com" className="text-primary hover:underline">privacy@job-tracker.noorulhassan.com</a>
        </p>
      </section>
    </LegalPageLayout>
  )
}
