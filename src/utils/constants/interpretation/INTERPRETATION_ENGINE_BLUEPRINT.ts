/**
 * 해석 엔진의 단계별 실행 청사진과 출력 계약을 정의합니다.
 */
export const INTERPRETATION_ENGINE_BLUEPRINT = {
  phases: [
    {
      id: "phase_1_input_normalization",
      steps: [
        "normalize_context",
        "normalize_card_ids",
        "resolve_spread_positions",
        "attach_personalization_profile",
      ],
    },
    {
      id: "phase_2_card_scoring",
      steps: [
        "extract_basic_meaning",
        "extract_context_meaning",
        "attach_semantic_tags",
        "apply_context_bias",
        "apply_position_weight",
        "apply_reversed_logic",
      ],
    },
    {
      id: "phase_3_combination_rules",
      steps: ["apply_tag_combination_rules", "apply_card_combination_rules"],
    },
    {
      id: "phase_4_emotion_synthesis",
      steps: [
        "aggregate_vad_vectors",
        "apply_emotion_shifts",
        "clamp_emotion_range",
      ],
    },
    {
      id: "phase_5_visual_psychology",
      steps: [
        "read_symbol_coordinates",
        "resolve_gaze_flow",
        "resolve_color_psychology",
        "resolve_spatial_psychology",
      ],
    },
    {
      id: "phase_6_conflict_resolution",
      steps: [
        "resolve_signal_conflicts",
        "calibrate_confidence",
        "generate_action_plan",
      ],
    },
    {
      id: "phase_7_output_generation",
      steps: [
        "compose_spread_sections",
        "render_templates",
        "attach_healing_affirmation",
        "apply_prompt_personalization",
      ],
    },
  ],

  outputContract: {
    requiredFields: [
      "cardInterpretations",
      "spreadSynthesis",
      "actionPlan",
      "healingAffirmation",
      "visualPsychology",
      "confidence",
      "trace",
    ],
    traceFields: [
      "appliedTagRules",
      "appliedCardRules",
      "positionWeightMap",
      "emotionSummary",
      "visualTrace",
      "conflictResolutionSummary",
    ],
  },
} as const;


