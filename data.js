const data = {
  CT: {
    role: 'Classroom Teacher',
    start: {
      title: 'Classroom Teacher – Start',
      description: 'Implement preventative classroom management and set clear routines. If minor behaviours occur, proceed through least → most intrusive responses before consequences.',
      bullets: [
        'Line up at door, orderly entry, call roll with structure',
        'Seating plan, 5–10 positives for every correction',
        'Use RISE vocabulary and descriptive cues',
        'Plan to student need, including disability adjustments',
      ],
    },
    minorBehaviours: {
      title: 'Minor challenging behaviours',
      behaviours: [
        'Disruption (talking over, calling out, off-task)',
        'Lateness to class',
        'Inappropriate language',
        'Physical contact (non-serious)',
        'Property misuse (off-task laptop/phone)',
        'Other off-task behaviours',
      ],
      guidance: 'Use least → most intrusive responses before issuing consequences.',
      consequence: 'Issue a classroom teacher reflection and document in CHAS; keep parents informed (email/PAL/phone).',
    },
    major: {
      title: 'Major behaviour (immediate referral)',
      description: 'For major behaviours refer immediately to Head Teacher.',
    },
    challenging: {
      title: 'Challenging behaviours',
      inClass: [
        'Brief chat outside (student is NOT to remain outside for entire lesson)',
        'Lunch detention with CTR (classroom teacher reflection)',
        'Document (CHAS) – notify parents (e.g. email/PAL)',
        '5–10 minute discussion after class',
      ],
      followUp: 'If challenging behaviours continue, repeat the process once more; on the 3rd attempt refer to the Head Teacher and notify parents. If the student does not attend detention, follow up and insist they attend reflection at an alternate time; after the 3rd failed attendance, refer to the Head Teacher.',
      escalation: 'If challenging behaviours continue in the lesson despite the above process being followed, send with note to colleague, Head Teacher and Deputy Principal. Follow up with student (e.g., lunch detention with restorative questions) and notify parents (phone call or PAL).',
    },
  },
  HT: {
    role: 'Head Teacher',
    triggers: {
      title: 'Exec Managed Challenging Behaviours',
      bullets: [
        '3 × lunch detentions (following classroom teacher process) = HT referral',
        'Damage to classroom equipment',
        'Significant defiance',
        'Ongoing truancy (HT Wellbeing or HT Admin)',
        'Major behaviours – referral to Deputy Principal',
      ],
    },
    consequences: {
      title: 'Head Teacher – Consequences',
      bullets: [
        'Faculty afternoon detention',
        'Faculty monitoring card',
        'Removal from class (e.g. in-faculty suspension / attend senior lesson)',
        'Notify Deputy Principal',
      ],
      outcomes: [
        { option: 'Behaviours improve', next: 'Return to class / monitoring' },
        { option: 'No improvement', next: 'Consider additional consequences or monitoring' },
        { option: '2 × faculty referrals', next: 'Triggers Deputy Principal intake' },
      ],
    },
  },
  DP: {
    role: 'Deputy Principal',
    intake: {
      title: 'Deputy Principal – Intake',
      description: '2 × faculty referrals triggers DP intervention. DP ensures compliance with outstanding CT reflections and may issue further consequences.',
      options: [
        { option: 'Issue DP consequence(s)', next: 'DP consequences' },
        { option: 'Meets DP-managed behaviour criteria', next: 'Return to class with monitoring' },
      ],
    },
    consequences: {
      title: 'Deputy Principal – Consequences',
      bullets: [
        'Wednesday afternoon detention',
        'Monitoring booklet (US in any class → DP lunch detention)',
        'Formal caution to suspend',
        'Removal from particular classes and restorative conversation with CT (if appropriate)',
        'If referral was due to failure to complete CT reflection: ensure original reflection is completed and issue Wednesday detention with DPR (DP Reflection)',
      ],
      outcomes: [
        { option: 'Behaviours improve', next: 'Return to class with monitoring' },
        { option: 'No improvement (repeat once more)', next: 'Repeat DP consequences' },
        { option: 'Need wraparound supports', next: 'Escalate to welfare team' },
      ],
    },
    managed: {
      title: 'DP Managed Challenging Behaviours',
      bullets: [
        'More than 2 faculty monitoring/HT directed at staff',
        'Physical violence',
        'Verbal intimidation',
        'Racism (+ ARCO) & other forms of discrimination',
        'Absconding from school grounds',
        'Actions considered criminal behaviour: theft, weapons, drugs, vaping, tobacco etc',
        'Banned items (e.g. rubber band guns)',
        'Graffiti/vandalism',
        'Property damage',
        'Bullying, harassment',
        'Spitting on property or other students',
        'Anti-social behaviour in community',
      ],
      support: {
        title: 'Referrals to support staff/services',
        bullets: [
          'Welfare Team',
          'School Counsellor',
          'SSO',
          'Complex Case Team',
          'Team Around the School',
          'Behaviour Support and Risk Management Planning',
        ],
      },
      note: 'Failure to improve after above process may result in suspension. Major behaviours may warrant immediate suspension.',
    },
  },
};
