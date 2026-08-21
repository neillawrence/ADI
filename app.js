const learners = [
  { id: 'alex', initials: 'AH', name: 'Alex Harper', age: 23, meta: 'Lesson 12 · Junctions', progress: 68, status: 'On track', tone: 'olive' },
  { id: 'priya', initials: 'PS', name: 'Priya Shah', age: 31, meta: 'Lesson 8 · Independent driving', progress: 51, status: 'Needs focus', tone: 'peach' },
  { id: 'oliver', initials: 'OR', name: 'Oliver Reed', age: 18, meta: 'Lesson 21 · Mock test', progress: 86, status: 'Test ready', tone: 'lilac' },
  { id: 'mia', initials: 'MC', name: 'Mia Collins', age: 27, meta: 'Lesson 5 · Moving off', progress: 29, status: 'Getting started', tone: 'butter' }
];
const storedRecords = (key) => { try { return JSON.parse(localStorage.getItem(key)) || []; } catch (error) { return []; } };
const lessonPlans = storedRecords('roadwiseLessonPlans');
const feedbackEntries = storedRecords('roadwiseFeedbackEntries');
const saveRecords = (key, records) => localStorage.setItem(key, JSON.stringify(records));
function refreshLearnerOptions() {
  const planStudent = $('#plansView .plan-form select');
  const feedbackLearner = $('#feedbackLearner');
  if (planStudent) planStudent.innerHTML = learners.map((learner) => `<option>${learner.name}</option>`).join('');
  if (feedbackLearner) feedbackLearner.innerHTML = learners.map((learner) => `<option value="${learner.name}">${learner.name}</option>`).join('');
}
const topics = [
  { title: 'Controls & cockpit drill', focus: 'Set up for a safe, confident drive', objectives: ['Identify and set all primary controls before moving.', 'Explain why seating, mirrors and restraints affect safety.'], sequence: ['Welcome learner at the parked car; invite them to set up without help.', 'Use show-me / tell-me prompts to check the cockpit drill.', 'Ask the learner to explain each adjustment and its safety benefit.', 'Repeat the drill until it is calm, consistent and independent.'], errors: ['Skipping the handbrake or gear check', 'Poor mirror alignment', 'Starting the engine before the safety checks'], questions: ['What would you like to adjust before we move?', 'What can you see in each mirror?', 'How will you know the car is secure?'], exercise: 'Park, reset the cockpit and complete the drill twice: once with a prompt, once independently.' },
  { title: 'Moving off & stopping', focus: 'Build a repeatable routine for smooth starts', objectives: ['Move away safely on a quiet, level road.', 'Stop under control with effective observation.'], sequence: ['Brief the POM routine: prepare, observe, move.', 'Demonstrate one calm move-off and narrate the observations.', 'Coach the learner through five starts, reducing prompts each time.', 'Add a controlled stop and secure the car after each repetition.'], errors: ['Rushing observations', 'Poor clutch biting-point control', 'Forgetting to secure the car after stopping'], questions: ['What is the car telling you through the clutch?', 'Where is the first safe gap?', 'What must you check before you release the brake?'], exercise: 'Complete five move-offs and stops, changing the stopping point each time.' },
  { title: 'Clutch control & gears', focus: 'Choose speed and gear with less workload', objectives: ['Find and hold the biting point smoothly.', 'Select a suitable gear for speed and road conditions.'], sequence: ['Find the biting point with the handbrake on.', 'Practise slow rolling, then add gentle acceleration.', 'Introduce upward and downward changes on a quiet route.', 'Review engine sound, road speed and forward planning.'], errors: ['Looking down at the gear lever', 'Holding the clutch down unnecessarily', 'Selecting a gear too early for the speed'], questions: ['What does the engine sound suggest?', 'What will the car need from you next?', 'Where can you complete the gear change safely?'], exercise: 'Use a loop with two stops, one hill and one turn; name the gear choice before each event.' },
  { title: 'Mirrors & blind spots', focus: 'Make information gathering purposeful', objectives: ['Use mirrors before changing speed, direction or position.', 'Understand what mirrors cannot show.'], sequence: ['Compare the view from each mirror while stationary.', 'Practise a mirror routine before simple speed changes.', 'Add a blind-spot check before moving around parked vehicles.', 'Review whether each glance changed the decision.'], errors: ['Checking mirrors without acting on information', 'Overlong mirror glances', 'Missing the blind spot before moving off'], questions: ['What changed since your last check?', 'How does that information affect your plan?', 'Which area cannot be covered by the mirrors?'], exercise: 'On a quiet road, call out the information you need before each planned speed or position change.' },
  { title: 'Junctions', focus: 'Approach with time, space and a clear plan', objectives: ['Choose a safe speed and position on approach.', 'Make effective observations before emerging or turning.'], sequence: ['Map the approach: mirrors, position, speed, look, decide.', 'Demonstrate one open and one closed junction.', 'Coach the learner through increasing complexity.', 'Use a quiet pause after each junction to review the decision.'], errors: ['Approaching too fast to look safely', 'Late signal or poor position', 'Emerging before the road is clear'], questions: ['What can you see and what remains hidden?', 'What is your safest speed for the view?', 'What would make you wait?'], exercise: 'Find three junctions with different levels of visibility and compare the approach plan.' },
  { title: 'Roundabouts', focus: 'Read traffic flow and choose safe gaps', objectives: ['Approach in the correct lane and at a safe speed.', 'Observe, decide and commit without hesitation.'], sequence: ['Review signs, lane markings and exit signals.', 'Demonstrate a simple left-turn roundabout.', 'Practise straight-ahead and right-turn routes with commentary.', 'Review lane discipline and exit timing.'], errors: ['Entering without a clear gap', 'Late lane change', 'Signalling too early or too late'], questions: ['Which lane takes you to that exit?', 'Where is your decision point?', 'What traffic could affect your chosen gap?'], exercise: 'Complete the same roundabout three ways, naming the lane, gap and exit signal beforehand.' },
  { title: 'Manoeuvres', focus: 'Slow, observe and adjust deliberately', objectives: ['Control the vehicle accurately at low speed.', 'Use effective all-round observation while manoeuvring.'], sequence: ['Choose a low-risk location and set a clear stopping point.', 'Demonstrate one manoeuvre with commentary.', 'Let the learner plan the reference points aloud.', 'Pause, reset and repeat with fewer prompts.'], errors: ['Moving too quickly', 'Focusing only on the kerb', 'Failing to stop and reassess'], questions: ['What can you not see right now?', 'What is the next safe adjustment?', 'Would a pause make this easier?'], exercise: 'Complete two attempts, with the learner choosing when to pause and reset.' },
  { title: 'Dual carriageways', focus: 'Plan ahead at higher speeds', objectives: ['Join, travel and leave safely at speed.', 'Maintain awareness of following traffic and developing hazards.'], sequence: ['Plan the route and identify joining and leaving points.', 'Discuss acceleration lanes and mirror checks.', 'Coach a joining sequence, then build independent commentary.', 'Review speed, following distance and exit preparation.'], errors: ['Joining too slowly', 'Staying in the wrong lane', 'Preparing for the exit too late'], questions: ['What information do you need before joining?', 'Where will you be in the next 20 seconds?', 'When will you start preparing for the exit?'], exercise: 'Use one short dual carriageway section and ask for a running plan before each change.' },
  { title: 'Independent driving', focus: 'Make safe decisions without step-by-step direction', objectives: ['Follow signs or a sat-nav while maintaining control.', 'Recover calmly when a direction is missed.'], sequence: ['Explain the route and agree that safety overrides navigation.', 'Start with a short sign-led section.', 'Add a sat-nav instruction and allow natural decisions.', 'Review planning, resilience and missed-direction recovery.'], errors: ['Prioritising the route over safety', 'Late lane changes', 'Freezing after a missed turn'], questions: ['What is the safest option now?', 'What information can wait?', 'How will you recover if you miss that turn?'], exercise: 'Drive a ten-minute route with only destination prompts; review three decisions afterwards.' }
];

const $ = (selector) => document.querySelector(selector);
const toast = (message) => { const el = $('#toast'); el.textContent = message; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2600); };
const avatarClass = (tone) => `avatar avatar-${tone}`;
function setupCurrentOverviewHeader() {
  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 18 ? 'Good afternoon' : 'Good evening';
  const fullDate = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(now);
  const shortDate = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }).format(now);
  $('#overviewView .page-heading h1').innerHTML = `${greeting}, Neil<span class="heading-period">.</span>`;
  $('#overviewView .page-heading .eyebrow').textContent = fullDate;
  $('.today-card strong').textContent = shortDate;
}
const learnerSnapshots = {
  alex: { status: 'On track', areas: '11 of 16 areas showing consistent performance.', competencies: [['Vehicle control', 82], ['Awareness & planning', 65], ['Junctions & roundabouts', 54]] },
  priya: { status: 'Needs focus', areas: '8 of 16 areas showing consistent performance.', competencies: [['Vehicle control', 70], ['Awareness & planning', 49], ['Independent driving', 42]] },
  oliver: { status: 'Test ready', areas: '14 of 16 areas showing consistent performance.', competencies: [['Vehicle control', 94], ['Awareness & planning', 86], ['Junctions & roundabouts', 78]] },
  mia: { status: 'Getting started', areas: '5 of 16 areas showing consistent performance.', competencies: [['Vehicle control', 42], ['Awareness & planning', 31], ['Moving off & stopping', 28]] }
};
const upcomingLessons = [
  { learnerId: 'alex', time: '10:30', lesson: '12', topic: 'Junction discipline', objective: 'Build calm decision-making at busy, staggered junctions.', skills: 'Mirrors · speed choice · junction discipline', route: 'Town centre to Brookfield' },
  { learnerId: 'priya', time: '13:00', lesson: '8', topic: 'Independent driving', objective: 'Build confidence following signs and recovering calmly from a missed direction.', skills: 'Planning · signs · independent decisions', route: 'Brookfield to North Circular' },
  { learnerId: 'oliver', time: '16:30', lesson: '21', topic: 'Mock test', objective: 'Complete an exam-style drive and review final areas for refinement.', skills: 'Test route · independent driving · reflection', route: 'Local test route 3' }
];
const planTemplates = [
  { id: 'foundation', number: '01', stage: 'Foundation', title: 'Build safe control', description: 'Beginner-friendly foundations for a calm, controlled drive.', components: 'Vehicle safety · controls · moving off · stopping · mirrors', objective: 'Set up the vehicle safely and build a calm routine for moving off and stopping.', skills: 'Cockpit drill · POM routine · clutch control · mirror checks', route: 'Quiet residential roads' },
  { id: 'developing', number: '02', stage: 'Developing', title: 'Read the road', description: 'Build observation, planning and decision-making in everyday traffic.', components: 'Junctions · roundabouts · meeting traffic · speed · road position', objective: 'Approach everyday hazards with time, space and a clear decision-making plan.', skills: 'Approach routine · gap selection · lane discipline · speed choice', route: 'Town centre and mixed residential route' },
  { id: 'independent', number: '03', stage: 'Independent', title: 'Drive with less prompting', description: 'Move from coached practice towards independent, resilient driving.', components: 'Independent driving · dual carriageways · hazards · manoeuvres', objective: 'Plan and complete a varied route independently while managing developing hazards.', skills: 'Sign-led planning · sat-nav recovery · hazard commentary · manoeuvres', route: 'Mixed urban route with dual carriageway section' },
  { id: 'test-ready', number: '04', stage: 'Test-ready', title: 'Rehearse the test', description: 'Consolidate the full syllabus and identify final refinement points.', components: 'Mock test · all DVSA competencies · self-assessment · reflection', objective: 'Complete an exam-style drive, demonstrate safe independence and agree final actions.', skills: 'Test route · independent driving · manoeuvres · debrief', route: 'Local driving test route' }
];
let activePlanTemplate = planTemplates[0];
function updateProgressSnapshot(id) {
  const learner = learners.find((item) => item.id === id) || learners[0];
  const snapshot = learnerSnapshots[learner.id] || learnerSnapshots.alex;
  const panel = $('.competency-panel');
  panel.querySelector('.eyebrow').textContent = learner.name;
  panel.querySelector('.pill').textContent = snapshot.status;
  panel.querySelector('.ring').style.setProperty('--progress', `${learner.progress}%`);
  panel.querySelector('.ring span').innerHTML = `${learner.progress}<small>%</small>`;
  panel.querySelector('.progress-summary p').textContent = snapshot.areas;
  panel.querySelectorAll('.competency-bars > div').forEach((bar, index) => {
    const competency = snapshot.competencies[index];
    if (!competency) return;
    bar.querySelector('span').textContent = competency[0];
    bar.querySelector('b').textContent = `${competency[1]}%`;
    bar.querySelector('em').style.width = `${competency[1]}%`;
  });
}
function openLessonPlan(lesson) {
  const learner = learners.find((item) => item.id === lesson.learnerId) || learners[0];
  const form = $('#plansView .plan-form');
  const field = (labelText) => Array.from(form.querySelectorAll('label')).find((label) => label.textContent.includes(labelText));
  field('Lesson number').querySelector('input').value = lesson.lesson;
  field('Student').querySelector('select').value = learner.name;
  field('Lesson objective').querySelector('textarea').value = lesson.objective;
  field('Key skills today').querySelector('input').value = lesson.skills;
  field('Planned route').querySelector('input').value = lesson.route;
  switchView('plans');
  toast(`${learner.name}'s lesson plan is ready to review.`);
}
function loadPlanTemplate(template) {
  activePlanTemplate = template;
  const form = $('#plansView .plan-form');
  const field = (labelText) => Array.from(form.querySelectorAll('label')).find((label) => label.textContent.includes(labelText));
  field('Lesson objective').querySelector('textarea').value = template.objective;
  field('Key skills today').querySelector('input').value = template.skills;
  field('Planned route').querySelector('input').value = template.route;
  $('#plansView .plan-editor h2').textContent = template.title;
  $('#plansView .plan-editor .editor-top p').textContent = `${template.description} Core areas: ${template.components}.`;
  $('#plansView .plan-editor .pill').textContent = template.stage.toUpperCase();
  document.querySelectorAll('.template-item').forEach((button) => button.classList.toggle('selected', button.dataset.templateId === template.id));
  switchView('plans');
}
function setupPlanTemplates() {
  const sidebar = $('.plan-sidebar');
  while (sidebar.querySelectorAll('.template-item').length < planTemplates.length) sidebar.insertAdjacentHTML('beforeend', '<button class="template-item"><span class="template-number"></span><span><strong></strong><small></small></span><span data-lucide="chevron-right"></span></button>');
  const buttons = sidebar.querySelectorAll('.template-item');
  buttons.forEach((button, index) => {
    const template = planTemplates[index];
    if (!template) return;
    button.dataset.templateId = template.id;
    button.innerHTML = `<span class="template-number">${template.number}</span><span><strong>${template.stage}: ${template.title}</strong><small>${template.components}</small></span><span data-lucide="chevron-right"></span>`;
    button.addEventListener('click', () => loadPlanTemplate(template));
  });
  loadPlanTemplate(activePlanTemplate);
  lucide.createIcons();
}
function renderSavedPlans(selectedId = '') {
  const list = $('#savedPlansList');
  if (!list) return;
  list.innerHTML = lessonPlans.length ? lessonPlans.map((plan) => `<button class="saved-record ${plan.id === selectedId ? 'selected' : ''}" data-plan-id="${plan.id}"><span class="saved-record-number">${String(plan.lessonNumber).padStart(2, '0')}</span><span><strong>${plan.learnerName}</strong><small>${plan.templateStage || 'Custom plan'} · ${plan.topic || plan.objective}</small></span><span data-lucide="chevron-right"></span></button>`).join('') : '<p class="empty-records">Saved lesson plans will appear here.</p>';
  list.querySelectorAll('[data-plan-id]').forEach((button) => button.addEventListener('click', () => loadSavedPlan(button.dataset.planId)));
  lucide.createIcons();
}
function loadSavedPlan(id) {
  const plan = lessonPlans.find((item) => item.id === id);
  if (!plan) return;
  activePlanTemplate = planTemplates.find((template) => template.id === plan.templateId) || activePlanTemplate;
  openLessonPlan({ learnerId: plan.learnerId, lesson: plan.lessonNumber, objective: plan.objective, skills: plan.skills, route: plan.route });
  $('#plansView .plan-editor h2').textContent = `${plan.learnerName} · Lesson ${plan.lessonNumber}`;
  $('#plansView .plan-editor .editor-top p').textContent = `Saved ${plan.savedLabel}`;
  renderSavedPlans(id);
}
function saveCurrentLessonPlan() {
  const form = $('#plansView .plan-form');
  const field = (labelText) => Array.from(form.querySelectorAll('label')).find((label) => label.textContent.includes(labelText));
  const learnerName = field('Student').querySelector('select').value;
  const learner = learners.find((item) => item.name === learnerName) || learners[0];
  const plan = { id: `plan-${Date.now()}`, learnerId: learner.id, learnerName: learner.name, lessonNumber: field('Lesson number').querySelector('input').value || '1', objective: field('Lesson objective').querySelector('textarea').value, skills: field('Key skills today').querySelector('input').value, route: field('Planned route').querySelector('input').value, topic: field('Lesson objective').querySelector('textarea').value.slice(0, 42), templateId: activePlanTemplate.id, templateStage: activePlanTemplate.stage, components: activePlanTemplate.components, savedLabel: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) };
  lessonPlans.unshift(plan);
  saveRecords('roadwiseLessonPlans', lessonPlans);
    renderSavedPlans(plan.id);
    refreshLearnerOptions();
  renderLearnerPlans(learner.id);
  $('#plansView .plan-editor h2').textContent = `${learner.name} · Lesson ${plan.lessonNumber}`;
  $('#plansView .plan-editor .editor-top p').textContent = `Saved ${plan.savedLabel}`;
  toast(`${learner.name}'s lesson plan saved.`);
}
function renderLearnerPlans(learnerId) {
  const list = $('#learnerPlanList');
  if (!list) return;
  const plans = lessonPlans.filter((plan) => plan.learnerId === learnerId);
  list.innerHTML = plans.length ? plans.map((plan) => `<button class="saved-record" data-plan-id="${plan.id}"><span class="saved-record-number">${String(plan.lessonNumber).padStart(2, '0')}</span><span><strong>Lesson ${plan.lessonNumber}</strong><small>${plan.topic || plan.objective}</small></span><span data-lucide="arrow-up-right"></span></button>`).join('') : '<p class="empty-records">No saved lesson plans yet.</p>';
  list.querySelectorAll('[data-plan-id]').forEach((button) => button.addEventListener('click', () => { $('#learnerDetailBackdrop').hidden = true; loadSavedPlan(button.dataset.planId); }));
  lucide.createIcons();
}
function saveFeedbackEntry(type) {
  const source = type === 'instructor' ? $('#instructorFeedbackForm') : $('#learnerFeedbackForm');
  const fields = Array.from(source.querySelectorAll('textarea')).map((field) => ({ prompt: field.parentElement.firstChild.textContent.trim(), response: field.value }));
  const learner = learners.find((item) => item.name === $('#feedbackLearner').value) || learners[0];
  const entry = { id: `feedback-${Date.now()}`, type, learnerId: learner.id, learnerName: learner.name, savedLabel: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }), fields, confidence: type === 'learner' ? $('#confidenceRange').value : null };
  feedbackEntries.unshift(entry);
  saveRecords('roadwiseFeedbackEntries', feedbackEntries);
  renderFeedbackEntries();
  toast(`${type === 'instructor' ? 'Instructor feedback' : 'Learner reflection'} saved for ${learner.name}.`);
}
function renderFeedbackEntries() {
  const list = $('#feedbackEntries');
  if (!list) return;
  list.innerHTML = feedbackEntries.length ? feedbackEntries.map((entry) => `<div class="feedback-record"><div><strong>${entry.learnerName}</strong><small>${entry.type === 'instructor' ? 'Instructor feedback' : 'Learner reflection'} · ${entry.savedLabel}</small></div><span>${entry.confidence ? `${entry.confidence} / 10` : `${entry.fields.filter((field) => field.response).length} responses`}</span></div>`).join('') : '<p class="empty-records">Saved feedback entries will appear here.</p>';
}
function setupLearnerIntakeForm() {
  const form = $('#learnerForm');
  const radioGroup = (name, values) => values.map((value) => `<label class="radio-field"><input name="${name}" type="radio" value="${value}">${value}</label>`).join('');
  form.innerHTML = `<div class="intake-section"><p class="eyebrow">Learner details</p><div class="intake-grid"><label>Name<input name="name" required placeholder="e.g. Sam Taylor"></label><label>Address<input name="address"></label><label>Phone<input name="phone" type="tel"></label><label>Email<input name="email" type="email"></label><label>Date of birth<input name="dateOfBirth" type="date"></label><label>Emergency contact<input name="emergencyContact"></label></div></div><div class="intake-section"><p class="eyebrow">Licence &amp; legal requirements</p><div class="intake-grid"><label class="check-field"><input name="provisionalLicenceChecked" type="checkbox" value="Yes">Provisional licence checked</label><label>Licence expiry date<input name="licenceExpiryDate" type="date"></label><label>Medical conditions affecting driving?<textarea name="medicalConditions" rows="2"></textarea></label><label>Eyesight concerns?<textarea name="eyesightConcerns" rows="2"></textarea></label><label class="check-field"><input name="wearsLenses" type="checkbox" value="Yes">Wears glasses/contact lenses</label></div></div><div class="intake-section"><p class="eyebrow">Driving experience</p><div class="intake-grid"><label class="check-field"><input name="newLearner" type="checkbox" value="Yes">Completely new learner</label><label class="check-field"><input name="previousLessons" type="checkbox" value="Yes">Some previous lessons</label><label class="check-field"><input name="familyPractice" type="checkbox" value="Yes">Practised with family/friends</label><label class="check-field"><input name="offRoadExperience" type="checkbox" value="Yes">Driven off-road/private land</label><label>Previous test attempts<input name="testAttempts" type="number" min="0" value="0"></label><label>Outcome / feedback<textarea name="testFeedback" rows="2"></textarea></label></div></div><div class="intake-section"><p class="eyebrow">Theory test</p><div class="intake-grid"><fieldset><legend>Theory test passed</legend>${radioGroup('theoryPassed', ['Yes', 'No'])}</fieldset><fieldset><legend>Hazard perception confidence</legend>${radioGroup('hazardConfidence', ['Low', 'Medium', 'High'])}</fieldset></div></div><div class="intake-section"><p class="eyebrow">Learner goals</p><div class="intake-grid"><label>Why do you want to learn to drive?<textarea name="goal" required rows="2"></textarea></label><label>Target timeline<input name="targetTimeline" placeholder="e.g. Test by December"></label><label class="wide-field">Specific goals<textarea name="specificGoals" rows="2"></textarea></label></div></div><div class="intake-section"><p class="eyebrow">Confidence &amp; anxiety</p><div class="intake-grid"><fieldset class="wide-field"><legend>Confidence level</legend><div class="radio-row">${radioGroup('confidence', Array.from({ length: 10 }, (_, index) => index + 1))}</div></fieldset><label class="wide-field">Anxieties or worries<textarea name="anxieties" rows="2"></textarea></label></div></div><div class="intake-section"><p class="eyebrow">Learning preferences</p><div class="intake-grid"><fieldset><legend>Preferred learning style</legend>${radioGroup('learningStyle', ['Visual', 'Verbal', 'Practical'])}</fieldset><fieldset><legend>Preferred pace</legend>${radioGroup('pace', ['Slow and steady', 'Moderate', 'Fast-paced'])}</fieldset><fieldset><legend>Preferred feedback style</legend>${radioGroup('feedbackStyle', ['Direct and clear', 'Gentle and supportive', 'Mixed'])}</fieldset></div></div><div class="intake-section"><p class="eyebrow">Availability &amp; logistics</p><div class="intake-grid"><label>Preferred lesson days/times<textarea name="availability" rows="2"></textarea></label><label>Pick-up location<input name="pickupLocation"></label><label>Drop-off location<input name="dropoffLocation"></label></div></div><div class="intake-section"><p class="eyebrow">Vehicle familiarity</p><div class="intake-grid"><fieldset><legend>Has used</legend>${radioGroup('vehicleType', ['Manual', 'Automatic', 'Neither'])}</fieldset><fieldset><legend>Comfort with car controls</legend>${radioGroup('controlComfort', ['None', 'Basic', 'Confident'])}</fieldset></div></div><button class="button button-dark" type="submit">Create learner</button>`;
}
function setupStoredRecordUi() {
  setupCurrentOverviewHeader();
  const planStudent = Array.from($('#plansView .plan-form').querySelectorAll('label')).find((label) => label.textContent.includes('Student')).querySelector('select');
  planStudent.innerHTML = learners.map((learner) => `<option>${learner.name}</option>`).join('');
  setupLearnerIntakeForm();
  setupPlanTemplates();
    $('#learnerForm').addEventListener('submit', () => { const details = Object.fromEntries(new FormData($('#learnerForm'))); setTimeout(() => { if (learners[0] && learners[0].name === details.name) learners[0].details = details; }, 0); });
  const planSidebar = $('.plan-sidebar');
  const savedPlansHeading = document.createElement('div');
  savedPlansHeading.className = 'saved-plans-heading';
  savedPlansHeading.innerHTML = '<p class="eyebrow">Saved plans</p><div id="savedPlansList"></div>';
  planSidebar.insertBefore(savedPlansHeading, planSidebar.querySelector('.template-item'));
  const learnerSections = $('.learner-detail-modal .detail-columns > section');
  const learnerPlans = document.createElement('div');
  learnerPlans.className = 'detail-section saved-learner-plans';
  learnerPlans.innerHTML = '<div class="section-title"><h3>Saved lesson plans</h3><span class="pill lilac-pill">Browse</span></div><div id="learnerPlanList"></div>';
  learnerSections.appendChild(learnerPlans);
  const instructorForm = $('.form-card');
  instructorForm.id = 'instructorFeedbackForm';
  instructorForm.insertAdjacentHTML('beforeend', '<div class="stored-form-actions"><button class="button button-outline" id="saveInstructorFeedbackBtn"><span data-lucide="save"></span>Save feedback</button></div>');
  const learnerForm = $('.reflection-card');
  learnerForm.id = 'learnerFeedbackForm';
  learnerForm.insertAdjacentHTML('afterbegin', '<label class="feedback-learner-field">Learner<select id="feedbackLearner"></select></label>');
  learnerForm.insertAdjacentHTML('beforeend', '<div class="stored-form-actions"><button class="button button-outline" id="saveLearnerFeedbackBtn"><span data-lucide="save"></span>Save reflection</button></div>');
  $('#feedbackLearner').innerHTML = learners.map((learner) => `<option value="${learner.name}">${learner.name}</option>`).join('');
  const feedbackTool = $('#feedbackTool');
  feedbackTool.insertAdjacentHTML('beforeend', '<section class="panel feedback-history"><div class="section-title"><div><p class="eyebrow">Saved entries</p><h2>Feedback history</h2></div></div><div id="feedbackEntries"></div></section>');
  lucide.createIcons();
}
function setupUpcomingLessons() {
  document.querySelectorAll('.schedule-row').forEach((row, index) => {
    const lesson = upcomingLessons[index];
    if (!lesson) return;
    row.dataset.lessonLearner = lesson.learnerId;
    row.setAttribute('role', 'button');
    row.tabIndex = 0;
    const open = (event) => { event.stopPropagation(); openLessonPlan(lesson); };
    row.addEventListener('click', open);
    row.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(event); } });
  });
}
const overviewDetails = {
  learners: {
    eyebrow: 'Learner directory',
    title: 'Active learners',
    copy: 'A current view of every learner in your studio.',
    content: () => `<div class="overview-detail-list">${learners.map((learner) => `<button class="overview-learner-row" data-learner="${learner.id}"><span class="${avatarClass(learner.tone)}">${learner.initials}</span><span><strong>${learner.name}</strong><small>${learner.age} years · ${learner.meta}</small></span><b>${learner.progress}%</b><span data-lucide="arrow-up-right"></span></button>`).join('')}</div>`
  },
  lessons: {
    eyebrow: 'This week',
    title: 'Lesson schedule',
    copy: 'Upcoming lessons and the learner focus for each drive.',
    content: () => `<div class="overview-detail-list"><div class="overview-schedule-row"><time>10:30</time><div><strong>Alex Harper</strong><small>Junction discipline · Lesson 12</small></div><span class="schedule-tag now">Next</span></div><div class="overview-schedule-row"><time>13:00</time><div><strong>Priya Shah</strong><small>Independent driving · Lesson 8</small></div><span class="schedule-tag">60 min</span></div><div class="overview-schedule-row"><time>16:30</time><div><strong>Oliver Reed</strong><small>Mock test · Lesson 21</small></div><span class="schedule-tag">90 min</span></div><div class="overview-summary"><strong>14 lessons planned</strong><span>Across 4 active learners this week</span></div></div>`
  },
  readiness: {
    eyebrow: 'DVSA progress',
    title: 'Pass readiness',
    copy: 'See how the learner base is progressing across core competencies.',
    content: () => `<div class="readiness-detail"><div class="readiness-total"><strong>72<em>%</em></strong><span>Average readiness across your learner base</span></div><div class="readiness-bars"><div><span>Vehicle control</span><b>82%</b><i><em style="width:82%"></em></i></div><div><span>Awareness &amp; planning</span><b>65%</b><i><em style="width:65%"></em></i></div><div><span>Junctions &amp; roundabouts</span><b>54%</b><i><em style="width:54%"></em></i></div><div><span>Independent decisions</span><b>73%</b><i><em style="width:73%"></em></i></div></div></div>`
  },
  next: {
    eyebrow: 'Next lesson',
    title: 'Alex Harper · 10:30',
    copy: 'The next scheduled lesson and the coaching focus attached to it.',
    content: () => `<div class="next-detail"><div><span class="next-detail-time">10:30</span><span class="schedule-tag now">Next</span></div><h3>Junction discipline</h3><p>Lesson 12 · Alex Harper</p><div class="overview-summary"><strong>Today’s focus</strong><span>Ask fewer questions, leave more thinking space.</span></div><button class="button button-outline" data-open-learner="alex">Open Alex’s profile <span data-lucide="arrow-up-right"></span></button></div>`
  }
};
function setupOverviewDetails() {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.hidden = true;
  backdrop.innerHTML = '<div class="overview-detail-modal"><button class="modal-close" aria-label="Close overview details"><span data-lucide="x"></span></button><p class="eyebrow" id="overviewDetailEyebrow"></p><h2 id="overviewDetailTitle"></h2><p class="modal-copy" id="overviewDetailCopy"></p><div id="overviewDetailContent"></div></div>';
  document.body.appendChild(backdrop);
  const close = () => { backdrop.hidden = true; };
  const open = (key) => { const detail = overviewDetails[key]; if (!detail) return; $('#overviewDetailEyebrow').textContent = detail.eyebrow; $('#overviewDetailTitle').textContent = detail.title; $('#overviewDetailCopy').textContent = detail.copy; $('#overviewDetailContent').innerHTML = detail.content(); backdrop.hidden = false; lucide.createIcons(); };
  document.querySelectorAll('.stat-card').forEach((card, index) => { const keys = ['learners', 'lessons', 'readiness', 'next']; card.dataset.overviewDetail = keys[index]; card.classList.add('overview-trigger'); });
  document.querySelectorAll('.learners-panel, .schedule-panel, .competency-panel').forEach((panel) => { panel.classList.add('overview-trigger'); panel.dataset.overviewDetail = panel.classList.contains('learners-panel') ? 'learners' : panel.classList.contains('schedule-panel') ? 'lessons' : 'readiness'; });
  document.querySelectorAll('.overview-trigger').forEach((trigger) => { trigger.setAttribute('role', 'button'); trigger.tabIndex = 0; trigger.addEventListener('click', (event) => { if (event.target.closest('[data-learner], [data-open-learner], button, a') && !event.target.closest('#viewAllBtn, [title="Calendar view"]')) return; open(trigger.dataset.overviewDetail); }); trigger.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(trigger.dataset.overviewDetail); } }); });
  backdrop.querySelector('.modal-close').addEventListener('click', close);
  backdrop.addEventListener('click', (event) => { if (event.target === backdrop) close(); });
  backdrop.addEventListener('click', (event) => { const learner = event.target.closest('[data-learner]'); if (learner) { updateProgressSnapshot(learner.dataset.learner); close(); openLearnerDetail(learner.dataset.learner); } });
  backdrop.addEventListener('click', (event) => { const profile = event.target.closest('[data-open-learner]'); if (profile) { event.preventDefault(); close(); openLearnerDetail(profile.dataset.openLearner); } });
}
function renderLearners() { $('#learnerList').innerHTML = learners.map((learner) => `<div class="learner-row" data-learner="${learner.id}"><span class="${avatarClass(learner.tone)}">${learner.initials}</span><div><span class="learner-name">${learner.name}</span><span class="learner-meta">${learner.age} years · ${learner.meta}</span></div><div class="progress-mini"><em style="width:${learner.progress}%"></em></div><span class="learner-progress">${learner.progress}%</span></div>`).join(''); document.querySelectorAll('#learnerList [data-learner]').forEach((row) => row.addEventListener('click', () => { updateProgressSnapshot(row.dataset.learner); openLearnerDetail(row.dataset.learner); })); }
function openLearnerDetail(id) { const learner = learners.find((item) => item.id === id) || learners[0]; $('#detailAvatar').textContent = learner.initials; $('#detailName').textContent = learner.name; $('#detailMeta').textContent = `${learner.age} years · Working towards a confident first test`; renderLearnerPlans(learner.id); $('#learnerDetailBackdrop').hidden = false; lucide.createIcons(); }
function renderTopics(filter = '') { const filtered = topics.filter((topic) => topic.title.toLowerCase().includes(filter.toLowerCase())); $('#topicList').innerHTML = filtered.map((topic, index) => `<button class="topic-card ${index === 0 ? 'selected' : ''}" data-topic="${topics.indexOf(topic)}"><span class="topic-index">${String(topics.indexOf(topic) + 1).padStart(2, '0')}</span><span><strong>${topic.title}</strong><small>${topic.focus}</small></span><span data-lucide="arrow-up-right"></span></button>`).join('') || '<div class="panel"><p class="lede">No topic matches that search.</p></div>'; document.querySelectorAll('[data-topic]').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('.topic-card').forEach((card) => card.classList.remove('selected')); button.classList.add('selected'); renderTopicDetail(topics[button.dataset.topic]); })); if (filtered.length) renderTopicDetail(filtered[0]); lucide.createIcons(); }
function renderTopicDetail(topic) { $('#topicDetail').innerHTML = `<p class="eyebrow">Micro-plan · ${String(topics.indexOf(topic) + 1).padStart(2, '0')}</p><h2>${topic.title}</h2><p class="intro">${topic.focus}. Use this sequence as a starting point, then adapt your coaching to the learner in front of you.</p><div class="micro-sections"><section class="micro-section"><h3>Learning objectives</h3><ul>${topic.objectives.map((item) => `<li>${item}</li>`).join('')}</ul></section><section class="micro-section"><h3>Typical learner errors</h3><ul>${topic.errors.map((item) => `<li>${item}</li>`).join('')}</ul></section><section class="micro-section"><h3>Teaching sequence</h3><ul>${topic.sequence.map((item) => `<li>${item}</li>`).join('')}</ul></section><section class="micro-section"><h3>Coaching questions</h3><ul>${topic.questions.map((item) => `<li>${item}</li>`).join('')}</ul></section><section class="micro-section exercise"><h3>Short practice exercise</h3><p>${topic.exercise}</p></section></div>`; }
function switchView(view) { document.querySelectorAll('.view').forEach((section) => section.classList.remove('active-view')); $(`#${view}View`).classList.add('active-view'); document.querySelectorAll('.nav-item, .mobile-nav-item').forEach((item) => item.classList.toggle('active', item.dataset.view === view)); $('#pageTitle').textContent = view === 'overview' ? 'Overview' : view === 'plans' ? 'Lesson plans' : view === 'topics' ? 'Micro-plans' : 'Toolkit'; window.scrollTo({ top: 0, behavior: 'smooth' }); }
function setupToolkit() { document.querySelectorAll('.tool-tab').forEach((tab) => tab.addEventListener('click', () => { document.querySelectorAll('.tool-tab').forEach((item) => item.classList.remove('active')); document.querySelectorAll('.tool-content').forEach((item) => item.classList.remove('active-tool')); tab.classList.add('active'); $(`#${tab.dataset.tool}Tool`).classList.add('active-tool'); lucide.createIcons(); })); $('#confidenceRange').addEventListener('input', (event) => { $('#confidenceOutput').textContent = `${event.target.value} / 10`; }); document.querySelectorAll('[data-resource]').forEach((button) => button.addEventListener('click', () => toast(`${button.dataset.resource} is ready for your reference library.`))); $('#saveToolkitBtn').addEventListener('click', () => toast('Toolkit notes saved to this browser.')); $('#addCpdBtn').addEventListener('click', () => toast('New CPD entry ready to record.')); $('#saveInstructorFeedbackBtn').addEventListener('click', () => saveFeedbackEntry('instructor')); $('#saveLearnerFeedbackBtn').addEventListener('click', () => saveFeedbackEntry('learner')); renderFeedbackEntries(); }
function setupVoiceCapture() { const button = $('#captureBtn'); const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; let listening = false; let recognition; if (SpeechRecognition) { recognition = new SpeechRecognition(); recognition.continuous = true; recognition.interimResults = true; recognition.onresult = (event) => { const text = Array.from(event.results).map((result) => result[0].transcript).join(' '); button.dataset.transcript = text; }; recognition.onend = () => { if (listening) recognition.start(); }; } button.addEventListener('click', () => { if (!SpeechRecognition) { toast('Voice capture needs Chrome or Edge microphone access.'); return; } listening = !listening; button.classList.toggle('recording', listening); button.innerHTML = listening ? '<span data-lucide="square"></span>Stop & save note' : '<span data-lucide="mic"></span>Start voice note'; lucide.createIcons(); if (listening) { recognition.start(); toast('Listening. Speak your lesson note naturally.'); } else { recognition.stop(); toast(button.dataset.transcript ? 'Voice note captured and ready for your next lesson page.' : 'No speech detected yet.'); } }); }
function setupModal() { const backdrop = $('#modalBackdrop'); const detailBackdrop = $('#learnerDetailBackdrop'); $('#newLearnerBtn').addEventListener('click', () => { backdrop.hidden = false; }); $('#modalClose').addEventListener('click', () => { backdrop.hidden = true; }); $('#learnerDetailClose').addEventListener('click', () => { detailBackdrop.hidden = true; }); backdrop.addEventListener('click', (event) => { if (event.target === backdrop) backdrop.hidden = true; }); detailBackdrop.addEventListener('click', (event) => { if (event.target === detailBackdrop) detailBackdrop.hidden = true; }); $('#oneNoteBtn').addEventListener('click', () => toast('Open your Driving Instruction shortcut to continue in OneNote.')); $('#addLogBtn').addEventListener('click', () => toast('New lesson log entry ready to capture.')); $('#learnerForm').addEventListener('submit', (event) => { event.preventDefault(); const data = new FormData(event.target); const name = data.get('name'); learners.unshift({ id: name.toLowerCase().replace(/\\s+/g, '-'), initials: name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(), name, age: data.get('age') || 17, meta: 'Lesson 1 · Getting started', progress: 5, status: 'Getting started', tone: 'mint' }); renderLearners(); backdrop.hidden = true; event.target.reset(); toast(`${name} added to your learners.`); }); }
document.addEventListener('DOMContentLoaded', () => { renderLearners(); renderTopics(); setupStoredRecordUi(); renderSavedPlans(); lucide.createIcons(); document.querySelectorAll('.nav-item, .mobile-nav-item').forEach((item) => item.addEventListener('click', () => switchView(item.dataset.view))); $('#viewAllBtn').addEventListener('click', () => toast('Learner directory is ready for your next update.')); $('#duplicatePlanBtn').addEventListener('click', () => toast('Template duplicated. Give this lesson a number and student.')); $('#savePlanBtn').addEventListener('click', saveCurrentLessonPlan); $('#topicSearch').addEventListener('input', (event) => renderTopics(event.target.value)); setupOverviewDetails(); setupUpcomingLessons(); setupVoiceCapture(); setupModal(); setupToolkit(); });
