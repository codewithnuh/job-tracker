import { LegalPageLayout } from "@/components/legal-page-layout"

export const metadata = {
  title: "Terms of Service - JobTracker",
  description: "Review the Terms of Service for JobTracker. Understand your rights and responsibilities when using our platform.",
}

export default function TermsPage() {
  const h2Classes = "text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6"
  const pClasses = "text-lg leading-relaxed text-muted-foreground mb-6"
  const listClasses = "list-disc pl-6 space-y-2 text-muted-foreground mb-8 text-lg"

  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="April 18, 2026">
      <section>
        <h2 className={h2Classes}>1. Introduction and Acceptance</h2>
        <p className={pClasses}>
          These Terms of Service ("Terms") govern your access to and use of the JobTracker platform ("Platform"). By creating an account, accessing, or using the Platform, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our services.
        </p>
      </section>

      <section>
        <h2 className={h2Classes}>2. User Accounts</h2>
        <p className={pClasses}>
          To access certain features, you must register for an account. You are responsible for:
        </p>
        <ul className={listClasses}>
          <li>Maintaining the confidentiality of your account credentials.</li>
          <li>All activities that occur under your account.</li>
          <li>Providing accurate and complete information during registration.</li>
        </ul>
        <p className={pClasses}>
          We reserve the right to suspend or terminate accounts that provide false information or violate these Terms.
        </p>
      </section>

      <section>
        <h2 className={h2Classes}>3. Use of the Platform</h2>
        <p className={pClasses}>
          JobTracker provides a tool for tracking job applications. You agree to use the Platform only for lawful purposes and in accordance with these Terms. You shall not:
        </p>
        <ul className={listClasses}>
          <li>Use the Platform for any commercial competitive analysis.</li>
          <li>Attempt to circumvent any security measures or gain unauthorized access to our systems.</li>
          <li>Automate the collection of data from the Platform (scraping) without our express consent.</li>
          <li>Use the Platform to store or transmit infringing, libelous, or otherwise unlawful material.</li>
        </ul >
      </section>

      <section>
        <h2 className={h2Classes}>4. Intellectual Property</h2>
        <p className={pClasses}>
          The Platform, including its original content, features, and functionality (excluding user-provided data), is and will remain the exclusive property of JobTracker and its licensors. Our trademarks, logos, and service marks may not be used without our prior written permission.
        </p>
      </section>

      <section>
        <h2 className={h2Classes}>5. User-Generated Content</h2>
        <p className={pClasses}>
          You retain all rights to the data you input into JobTracker. By using the Platform, you grant us a worldwide, non-exclusive, royalty-free license to use, host, and store your content solely for the purpose of providing and improving our services to you.
        </p>
      </section>

      <section>
        <h2 className={h2Classes}>6. Termination</h2>
        <p className={pClasses}>
          We may terminate or suspend your access to the Platform immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Platform will cease immediately.
        </p>
      </section>

      <section>
        <h2 className={h2Classes}>7. Limitation of Liability</h2>
        <p className={pClasses}>
          To the maximum extent permitted by law, JobTracker shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from your use of the Platform.
        </p>
      </section>

      <section>
        <h2 className={h2Classes}>8. Governing Law and Jurisdiction</h2>
        <p className={pClasses}>
          These Terms shall be governed and construed in accordance with the laws of Pakistan. Any legal suit, action, or proceeding arising out of, or related to, these Terms or the Platform shall be instituted exclusively in the courts of Pakistan.
        </p>
      </section>

      <section>
        <h2 className={h2Classes}>9. Changes to Terms</h2>
        <p className={pClasses}>
          We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page. Your continued use of the Platform after changes have been posted constitutes your acceptance of the new Terms.
        </p>
      </section>

      <section>
        <h2 className={h2Classes}>10. Contact Information</h2>
        <p className={pClasses}>
          If you have any questions about these Terms, please contact us at:
        </p>
        <p className={pClasses}>
          <strong>Email:</strong> <a href="mailto:terms@job-tracker.noorulhassan.com" className="text-primary hover:underline">terms@job-tracker.noorulhassan.com</a>
        </p>
      </section>
    </LegalPageLayout>
  )
}
