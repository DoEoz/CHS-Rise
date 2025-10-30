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
      ]
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
      consequence: 'Issue a classroom teacher reflection and document in CHAS; keep parents informed (email/PAL/phone).'
    },
    major: {
      title: 'Major behaviour (immediate referral)',
      description: 'For major behaviours refer immediately to Head Teacher.',
    }
  },
  HT: {
    role: 'Head Teacher',
    consequences: {
      title: 'Head Teacher – Consequences',
      bullets: [
        'Head Teacher Reflection (HTR)',
        'Faculty afternoon detention',
        'Faculty monitoring card',
        'Restorative meeting (student, CT, HT)',
        'Removal from class (e.g., in-faculty suspension / attend senior lesson)',
        'Notify Deputy Principal'
      ],
      outcomes: [
        { option: 'Behaviours improve', next: 'No further action' },
        { option: 'No improvement', next: 'Consider additional consequences or monitoring' },
        { option: '2 × faculty referrals', next: 'Triggers Deputy Principal intake' }
      ]
    }
  },
  DP: {
    role: 'Deputy Principal',
    intake: {
      title: 'Deputy Principal – Intake',
      description: '2 × faculty referrals triggers DP intervention. DP ensures compliance with outstanding CT reflections and may issue further consequences.',
      options: [
        { option: 'Issue DP consequence(s)', next: 'DP consequences' },
        { option: 'Meets DP-managed behaviour criteria', next: 'Return to class with monitoring' }
      ]
    },
    consequences: {
      title: 'Deputy Principal – Consequences',
      bullets: [
        'Wednesday afternoon detention',
        'Monitoring booklet (US in any class → DP lunch detention)',
        'Formal caution to suspend',
        'Removal from particular classes and restorative conversation with CT (if appropriate)',
        'If referral was due to failure to complete CT reflection: ensure original reflection is completed and issue Wednesday detention with DPR (DP Reflection)'
      ],
      outcomes: [
        { option: 'Behaviours improve', next: 'Return to class with monitoring' },
        { option: 'No improvement (repeat once more)', next: 'Repeat DP consequences' },
        { option: 'Need wraparound supports', next: 'Escalate to welfare team' }
      ]
    }
  }
};
