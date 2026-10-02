import React, { useState, useEffect, useId, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';
import { useTranslation } from '../i18n/TranslationContext';
import { useDialog } from '@/hooks/useDialog';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.lg};
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div<{ $embedded?: boolean }>`
  background: ${props => props.$embedded ? 'transparent' : '#FDFBF9'};
  border-radius: ${props => props.$embedded ? '0' : '24px'};
  max-width: ${props => props.$embedded ? '700px' : '600px'};
  width: 100%;
  margin: ${props => props.$embedded ? '0 auto' : '0'};
  max-height: ${props => props.$embedded ? 'none' : '90vh'};
  overflow-y: ${props => props.$embedded ? 'visible' : 'auto'};
  position: relative;
  box-shadow: ${props => props.$embedded ? 'none' : '0 40px 80px rgba(0, 0, 0, 0.25)'};
  animation: ${fadeIn} 0.4s ease-out;
  
  &::-webkit-scrollbar { width: 0; }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #796B5F;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    transform: rotate(90deg);
  }
`;

const FormHeader = styled.div`
  text-align: center;
  padding: 48px 40px 32px;
  background: linear-gradient(180deg, rgba(201, 160, 80, 0.08) 0%, transparent 100%);
  
  h2 {
    font-size: clamp(1.5rem, 4vw, 2.2rem);
    font-weight: 300;
    color: #4A4039;
    margin-bottom: 8px;
    font-family: 'Playfair Display', serif;
    letter-spacing: 0.02em;
  }
  
  p {
    color: #8A7B6D;
    font-size: 1rem;
    font-weight: 300;
  }
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 0 40px 24px;
`;

const StepDot = styled.button<{ $active: boolean; $completed: boolean }>`
  width: ${props => props.$active ? '32px' : '10px'};
  height: 10px;
  border-radius: 5px;
  border: none;
  background: ${props => 
    props.$completed ? '#C9A050' : 
    props.$active ? 'linear-gradient(90deg, #C9A050, #D4B76A)' : 
    '#E5DED6'};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: scale(1.1);
  }
`;

const Form = styled.form`
  padding: 0 40px 40px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 24px 32px;
  }
`;

const StepContent = styled.fieldset<{ $active: boolean }>`
  border: 0;
  padding: 0;
  margin: 0;
  min-width: 0;
  display: ${props => props.$active ? 'block' : 'none'};
  animation: ${fadeIn} 0.4s ease-out;
`;

const StepTitle = styled.h3`
  font-size: 1.1rem;
  color: #C9A050;
  font-weight: 500;
  margin-bottom: 24px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  display: flex;
  align-items: center;
  gap: 12px;
  
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, #E5DED6, transparent);
  }
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
  
  label {
    display: block;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #8A7B6D;
    margin-bottom: 8px;
    font-weight: 500;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 0;
  border: none;
  border-bottom: 1px solid #E5DED6;
  font-size: 1.1rem;
  color: #4A4039;
  background: transparent;
  transition: all 0.3s ease;
  font-family: inherit;
  
  &::placeholder {
    color: #C5B9AC;
  }
  
  &:focus {
    outline: none;
    border-bottom-color: #C9A050;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 16px;
  border: 1px solid #E5DED6;
  border-radius: 12px;
  font-size: 1rem;
  color: #4A4039;
  background: #FAFAF8;
  transition: all 0.3s ease;
  font-family: inherit;
  min-height: 120px;
  resize: vertical;
  
  &::placeholder {
    color: #C5B9AC;
  }
  
  &:focus {
    outline: none;
    border-color: #C9A050;
    background: white;
    box-shadow: 0 0 0 4px rgba(201, 160, 80, 0.1);
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid #8A7B6D;
    pointer-events: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 16px 0;
  border: none;
  border-bottom: 1px solid #E5DED6;
  font-size: 1.1rem;
  color: #4A4039;
  background: transparent;
  appearance: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-bottom-color: #C9A050;
  }
  
  option {
    padding: 12px;
  }
`;

const PackageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const PackageCard = styled.button<{ $selected: boolean }>`
  padding: 20px;
  border: 2px solid ${props => props.$selected ? '#C9A050' : '#E5DED6'};
  border-radius: 16px;
  background: ${props => props.$selected ? 'rgba(201, 160, 80, 0.08)' : 'white'};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  
  &:hover {
    border-color: #C9A050;
    transform: translateY(-2px);
  }
  
  .icon {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }
  
  .name {
    font-size: 1rem;
    font-weight: 500;
    color: #4A4039;
    margin-bottom: 4px;
  }
  
  .desc {
    font-size: 0.85rem;
    color: #8A7B6D;
  }
`;

const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
`;

const Button = styled.button<{ $primary?: boolean; $loading?: boolean }>`
  flex: 1;
  padding: 18px 32px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  ${props => props.$primary ? `
    background: linear-gradient(135deg, #4A4039 0%, #3A3229 100%);
    color: white;
    border: none;
    box-shadow: 0 4px 20px rgba(74, 64, 57, 0.3);
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(74, 64, 57, 0.4);
    }
  ` : `
    background: transparent;
    color: #8A7B6D;
    border: 1px solid #E5DED6;
    
    &:hover:not(:disabled) {
      border-color: #C9A050;
      color: #C9A050;
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  ${props => props.$loading && `
    background: linear-gradient(90deg, #C9A050 0%, #D4B76A 50%, #C9A050 100%);
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
  `}
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const SuccessContent = styled.div`
  text-align: center;
  padding: 60px 40px;
  animation: ${fadeIn} 0.5s ease-out;
  
  .icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #C9A050, #D4B76A);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    font-size: 2rem;
    color: white;
    animation: ${float} 2s ease-in-out infinite;
  }
  
  h3 {
    font-size: clamp(1.3rem, 3vw, 1.8rem);
    color: #4A4039;
    margin-bottom: 12px;
    font-family: 'Playfair Display', serif;
    font-weight: 400;
  }
  
  p {
    color: #8A7B6D;
    font-size: 1.05rem;
    line-height: 1.6;
    max-width: 400px;
    margin: 0 auto 32px;
  }
`;

const Notification = styled.div<{ $type: 'success' | 'error' }>`
  position: fixed;
  top: 24px;
  right: 24px;
  padding: 16px 24px;
  background: ${props => props.$type === 'success' ? '#4CAF50' : '#E53935'};
  color: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
  z-index: 1100;
  animation: ${fadeIn} 0.4s ease-out;
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    left: 24px;
    right: 24px;
  }
`;

const WEDDING_SCRIPT_URL = process.env.NEXT_PUBLIC_WEDDING_FORM_URL;
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_WEDDINGS_ID;

interface WeddingInquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: string;
  embedded?: boolean;
}

export default function WeddingInquiryForm({ isOpen, onClose, selectedPackage, embedded = false }: WeddingInquiryFormProps) {
  const { t, locale } = useTranslation();
  const id = useId();
  const dialogRef = useDialog(!embedded && isOpen, onClose);
  const formRef = useRef<HTMLFormElement>(null);
  const wf = 'photography.wedding.form';
  const ws = 'photography.wedding.services';

  const packages = [
    { id: 'Elopement', name: t(`${ws}.elopements.title`), icon: '💍', desc: t(`${wf}.pkgElopementDesc`) },
    { id: 'Engagement', name: t(`${ws}.engagement.title`), icon: '💑', desc: t(`${wf}.pkgEngagementDesc`) },
    { id: 'Couples', name: t(`${ws}.couples.title`), icon: '❤️', desc: t(`${wf}.pkgCouplesDesc`) },
    { id: 'Photobooks', name: t(`${ws}.photobooks.title`), icon: '📖', desc: t(`${wf}.pkgPhotobooksDesc`) },
  ];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    package: packages.some(pkg => pkg.id === selectedPackage) ? selectedPackage! : '',
    location: '',
    about: '',
    message: '',
    referral: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const totalSteps = 3;
  const previousStep = useRef(step);
  useEffect(() => {
    if (previousStep.current !== step) {
      formRef.current?.querySelector<HTMLElement>('fieldset:not(:disabled) input, fieldset:not(:disabled) textarea, fieldset:not(:disabled) button')?.focus();
      previousStep.current = step;
    }
  }, [step]);
  useEffect(() => {
    if (selectedPackage && ['Elopement', 'Engagement', 'Couples', 'Photobooks'].includes(selectedPackage)) {
      setFormData(data => ({ ...data, package: selectedPackage }));
    }
  }, [selectedPackage]);

  const handleNext = () => {
    if (isSubmitting || !formRef.current?.reportValidity()) return;
    if (step === 2 && !packages.some(pkg => pkg.id === formData.package)) {
      setSubmitStatus('error');
      setErrorMessage(locale === 'es' ? 'Selecciona un paquete para continuar.' : 'Choose a package to continue.');
      return;
    }
    setSubmitStatus('idle');
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (step < totalSteps) {
      handleNext();
      return;
    }
    if (!formRef.current?.reportValidity()) return;
    
    if (!FORMSPREE_ID && !WEDDING_SCRIPT_URL) {
      setSubmitStatus('error');
      setErrorMessage(locale === 'es' ? 'El formulario no está disponible. Envía tu consulta por correo.' : 'Online submission is unavailable. Please email your inquiry.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (FORMSPREE_ID) {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ type: 'wedding', ...formData }),
        });
        if (!response.ok) throw new Error('Submission not accepted');
        const result = await response.json();
        if (result?.ok !== true) throw new Error('Submission not confirmed');
        setSubmitStatus('success');
        setFormData({
          name: '', email: '', phone: '', date: '', package: '',
          location: '', about: '', message: '', referral: '',
        });
        setStep(1);
        return;
      }

      await fetch(WEDDING_SCRIPT_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'wedding', ...formData }),
        mode: 'no-cors'
      });

      // A no-cors response cannot confirm whether the service accepted the inquiry.
      setSubmitStatus('error');
      setErrorMessage(locale === 'es' ? 'No podemos confirmar la entrega. Conservamos tus datos; contacta por correo antes de reenviar.' : 'We cannot confirm delivery. Your details are saved here; please email before submitting again.');
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(locale === 'es' ? 'No se ha confirmado el envío. Puedes contactar por correo.' : 'Delivery has not been confirmed. Please contact us by email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const formContent = (
    <Form ref={formRef} onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
      <StepContent $active={step === 1} disabled={step !== 1 || isSubmitting}>
        <StepTitle>{t(`${wf}.step1Title`)}</StepTitle>
        <InputGroup>
          <label htmlFor={`${id}-name`}>{t(`${wf}.fullName`)}</label>
          <Input
            id={`${id}-name`}
            autoComplete="name"
            type="text"
            placeholder={t(`${wf}.namePlaceholder`)}
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </InputGroup>
        <TwoColumn>
          <InputGroup>
            <label htmlFor={`${id}-email`}>{t(`${wf}.email`)}</label>
            <Input
              id={`${id}-email`}
              autoComplete="email"
              type="email"
              placeholder="your@email.com"
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor={`${id}-phone`}>{t(`${wf}.phone`)}</label>
            <Input
              id={`${id}-phone`}
              autoComplete="tel"
              type="tel"
              placeholder="(123) 456-7890"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </InputGroup>
        </TwoColumn>
      </StepContent>

      <StepContent $active={step === 2} disabled={step !== 2 || isSubmitting}>
        <StepTitle>{t(`${wf}.step2Title`)}</StepTitle>
        <InputGroup>
          <label id={`${id}-package-label`}>{t(`${wf}.choosePackage`)}</label>
        </InputGroup>
        <PackageGrid role="group" aria-labelledby={`${id}-package-label`}>
          {packages.map(pkg => (
            <PackageCard
              key={pkg.id}
              type="button"
              $selected={formData.package === pkg.id}
              aria-pressed={formData.package === pkg.id}
              onClick={() => setFormData({...formData, package: pkg.id})}
            >
              <div className="icon">{pkg.icon}</div>
              <div className="name">{pkg.name}</div>
              <div className="desc">{pkg.desc}</div>
            </PackageCard>
          ))}
        </PackageGrid>
        <TwoColumn>
          <InputGroup>
            <label htmlFor={`${id}-date`}>{t(`${wf}.preferredDate`)}</label>
            <Input
              id={`${id}-date`}
              type="date"
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor={`${id}-location`}>{t(`${wf}.location`)}</label>
            <Input
              id={`${id}-location`}
              type="text"
              placeholder={t(`${wf}.locationPlaceholder`)}
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
            />
          </InputGroup>
        </TwoColumn>
      </StepContent>

      <StepContent $active={step === 3} disabled={step !== 3 || isSubmitting}>
        <StepTitle>{t(`${wf}.step3Title`)}</StepTitle>
        <InputGroup>
          <label htmlFor={`${id}-message`}>{t(`${wf}.yourVision`)}</label>
          <TextArea
            id={`${id}-message`}
            placeholder={t(`${wf}.visionPlaceholder`)}
            required
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor={`${id}-about`}>{t(`${wf}.aboutYou`)}</label>
          <TextArea
            id={`${id}-about`}
            placeholder={t(`${wf}.aboutPlaceholder`)}
            value={formData.about}
            onChange={e => setFormData({...formData, about: e.target.value})}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor={`${id}-referral`}>{t(`${wf}.howFound`)}</label>
          <SelectWrapper>
            <Select
              id={`${id}-referral`}
              value={formData.referral}
              onChange={e => setFormData({...formData, referral: e.target.value})}
            >
              <option value="">{t(`${wf}.selectOption`)}</option>
              <option value="Google">Google</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="Friend">{t(`${wf}.friendReferral`)}</option>
              <option value="Other">{t(`${wf}.other`)}</option>
            </Select>
          </SelectWrapper>
        </InputGroup>
      </StepContent>

      <ButtonRow>
        {step > 1 && (
          <Button type="button" onClick={handlePrev} disabled={isSubmitting}>
            {t(`${wf}.back`)}
          </Button>
        )}
        {step < totalSteps ? (
          <Button type="submit" $primary>
            {t(`${wf}.continue`)}
          </Button>
        ) : (
          <Button type="submit" $primary disabled={isSubmitting} $loading={isSubmitting}>
            {isSubmitting ? <><Spinner /> {t(`${wf}.sending`)}</> : t(`${wf}.send`)}
          </Button>
        )}
      </ButtonRow>
      {((!FORMSPREE_ID && !WEDDING_SCRIPT_URL) || submitStatus === 'error') && (
        <p>
          {locale === 'es' ? 'Enviar consulta por correo: ' : 'Email your inquiry: '}
          <a href={`mailto:bycamilalonart@gmail.com?subject=Wedding%20inquiry&body=${encodeURIComponent(Object.entries(formData).map(([key, value]) => `${key}: ${value}`).join('\n'))}`}>bycamilalonart@gmail.com</a>
        </p>
      )}
    </Form>
  );

  const notification = submitStatus !== 'idle' && (
    <Notification role={submitStatus === 'error' ? 'alert' : 'status'} $type={submitStatus}>
      {submitStatus === 'success'
        ? (locale === 'es' ? 'Gracias. Tu consulta se ha enviado; la sesión aún no está confirmada.' : 'Thank you. Your inquiry was sent; your session is not yet confirmed.')
        : errorMessage || t(`${wf}.failedSend`)}
    </Notification>
  );

  if (embedded) {
    return (
      <ModalContent $embedded>
        <FormHeader>
          <h2>{t(`${wf}.heading`)}</h2>
          <p>{t(`${wf}.subheading`)}</p>
        </FormHeader>
        <StepIndicator>
          {[1, 2, 3].map(s => (
            <StepDot
              key={s}
              $active={s === step}
              $completed={s < step}
              type="button"
              aria-label={`${locale === 'es' ? 'Paso' : 'Step'} ${s}`}
              aria-current={s === step ? 'step' : undefined}
              disabled={isSubmitting || s > step + 1}
              onClick={() => s > step ? handleNext() : setStep(s)}
            />
          ))}
        </StepIndicator>
        {formContent}
        {notification}
      </ModalContent>
    );
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent ref={dialogRef} role="dialog" aria-modal="true" aria-label={t(`${wf}.heading`)} tabIndex={-1} onClick={e => e.stopPropagation()}>
        <CloseButton type="button" aria-label={t(`${wf}.close`)} onClick={onClose}>×</CloseButton>
        <FormHeader>
          <h2>{t(`${wf}.heading`)}</h2>
          <p>{t(`${wf}.subheading`)}</p>
        </FormHeader>
        <StepIndicator>
          {[1, 2, 3].map(s => (
            <StepDot
              key={s}
              $active={s === step}
              $completed={s < step}
              type="button"
              aria-label={`${locale === 'es' ? 'Paso' : 'Step'} ${s}`}
              aria-current={s === step ? 'step' : undefined}
              disabled={isSubmitting || s > step + 1}
              onClick={() => s > step ? handleNext() : setStep(s)}
            />
          ))}
        </StepIndicator>
        {formContent}
        {notification}
      </ModalContent>
    </ModalOverlay>
  );
}
