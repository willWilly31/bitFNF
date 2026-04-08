-- Drop overly permissive anon update policy
DROP POLICY "Anyone can upload payment proof" ON public.invoices;

-- More restrictive: anon can only update if status is 'sent' (awaiting payment)
CREATE POLICY "Anyone can upload payment proof on sent invoices"
  ON public.invoices FOR UPDATE
  TO anon
  USING (status = 'sent')
  WITH CHECK (status = 'sent');