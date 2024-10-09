import { useNavigate } from "react-router-dom";
import { Container, Title, Column, SubtitleRegister, EsqueciText, CriarText, Row, Wrapper, TitleRegister, InformationRegister } from './styles';
import { Button } from '../../components/Button';
import { MdEmail, MdLock, MdPeople } from 'react-icons/md'
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";

const Register = () => {

    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try {
            const { data } = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);

            if (data.length && data[0].id) {
                navigate('/feed')
                return
            }

            alert('Usuário ou senha inválido')
        } catch (e) {
            //TODO: HOUVE UM ERRO
        }
    };

    return (
        <>
            <Header />
            <Container>
                <Column>
                    <Title>
                        A plataforma para você
                        aprender com experts,
                        dominar as principais
                        tecnologias e entrar
                        mais rápido nas
                        empresas mais
                        desejadas.
                    </Title>
                </Column>
                <Column>
                    <TitleRegister>Comece agora grátis</TitleRegister>
                    <Wrapper>
                        <SubtitleRegister>Crie sua conta e make the change._</SubtitleRegister>
                        <form>
                            <Input placeholder="Nome Completo" leftIcon={<MdPeople />} name="name" control={control} />
                            <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
                            <Input type="password" placeholder="Senha" leftIcon={<MdLock />} name="senha" control={control} />
                            {errors.senha && <span>Senha é obrigatório</span>}
                            <Button title="Cadastrar-se" variant="secondary" type="submit" />
                        </form>
                        <InformationRegister>
                            <br />
                            Ao clicar em "criar minha conta grátis",
                            declaro que aceito as Políticas de
                            Privacidade e os Termos de Uso da DIO.
                        </InformationRegister>
                        <Row>
                            <EsqueciText>Já tenho conta.</EsqueciText>
                            <CriarText>Fazer login</CriarText>
                        </Row>
                    </Wrapper>
                </Column>
            </Container>
        </>
    )
}

export { Register }